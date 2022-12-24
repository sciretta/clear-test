use bytes::BufMut;
use db_client::sqlx::ty_match::WrapSame;
use juniper::futures::TryStreamExt;
use uuid::Uuid;
use warp::{
    multipart::{FormData, Part},
    Filter, Rejection, Reply,
};
mod filters;

async fn upload(form: FormData) -> Result<impl Reply, Rejection> {
    let parts: Vec<Part> = form.try_collect().await.map_err(|e| {
        eprintln!("form error: {}", e);
        warp::reject::reject()
    })?;

    for p in parts {
        if p.name() == "file" {
            let content_type = p.content_type();
            let file_ending;
            match content_type {
                Some(file_type) => match file_type {
                    "image/png" => {
                        file_ending = "png";
                    }
                    "image/jpg" => {
                        file_ending = "jpg";
                    }
                    "image/jpeg" => {
                        file_ending = "jpeg";
                    }
                    v => {
                        eprintln!("invalid file type found: {}", v);
                        return Err(warp::reject::reject());
                    }
                },
                None => {
                    eprintln!("file type could not be determined");
                    return Err(warp::reject::reject());
                }
            }

            let file_owner: String = p.filename().unwrap().to_string();

            let value = p
                .stream()
                .try_fold(Vec::new(), |mut vec, data| {
                    vec.put(data);
                    async move { Ok(vec) }
                })
                .await
                .map_err(|e| {
                    eprintln!("reading file error: {}", e);
                    warp::reject::reject()
                })?;

            let id = Uuid::new_v4().to_string();

            let file_name = format!("./files/{}-{}.{}", file_owner, id, file_ending);

            tokio::fs::write(&file_name, value).await.map_err(|e| {
                eprint!("error writing file: {}", e);
                warp::reject::reject()
            })?;

            // save image record
            let pool = db_client::connect()
                .await
                .expect("Failed to connect to database.");

            let query: &str = &format!(
                "insert into images (file_name, owner_username) values ('{}','{}');",
                format!("{}-{}.{}", file_owner, id, file_ending),
                file_owner
            );

            db_client::sqlx::query(query).fetch_all(&pool).await;
        }
    }

    Ok("success")
}

#[tokio::main]
async fn main() {
    env_logger::Builder::from_env(env_logger::Env::default().filter_or("LOG", "info")).init();

    let pool = db_client::connect()
        .await
        .expect("Failed to connect to database.");

    let api = filters::app_api(pool.clone());
    let api = warp::path("api").and(api).boxed();
    let graphiql = warp::path("graphiql")
        .and(juniper_warp::graphiql_filter("/api", None))
        .boxed();

    let file_upload = warp::path("upload")
        .and(warp::post())
        .and(warp::multipart::form().max_length(5_000_000))
        .and_then(upload);

    let serve_files = warp::path("files").and(warp::fs::dir("./files/"));

    warp::serve(
        api.or(graphiql)
            .with(warp::log("http"))
            .or(file_upload)
            .or(serve_files),
    )
    .run(([0, 0, 0, 0], 3030))
    .await;
}
