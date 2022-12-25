use super::context::Context;
use crate::filters::app_api::get_user_by_name;
use db_client::sqlx::Row;
use juniper::{graphql_object, GraphQLInputObject, GraphQLObject};

#[derive(GraphQLObject)]
pub struct User {
    pub id: String,
    pub username: String,
}

#[derive(GraphQLInputObject)]
pub struct UserInput {
    pub username: String,
}

pub struct Mutation;

#[graphql_object(context = Context)]
impl Mutation {
    async fn login_user(ctx: &Context, user: UserInput) -> User {
        match get_user_by_name(user.username.clone()).await {
            Some(res) => {
                return User {
                    username: res.username,
                    id: res.id,
                }
            }
            None => {
                println!("failed to get user");
            }
        }

        let pool = db_client::connect()
            .await
            .expect("Failed to connect to database.");

        let query: &str = &format!(
            "insert into users (username) values ('{}') returning id;",
            user.username
        );

        match db_client::sqlx::query(query).fetch_all(&pool).await {
            Ok(val) => User {
                username: user.username,
                id: val[0].get::<i32, _>("id").to_string(),
            },
            Err(err) => {
                println!("ERROR: {:?}", err);
                User {
                    username: "".to_string(),
                    id: "".to_string(),
                }
            }
        }
    }

    async fn delete_image(ctx: &Context, file_name: String) -> bool {
        let pool = db_client::connect()
            .await
            .expect("Failed to connect to database.");

        let query: &str = &format!("delete from images where file_name='{}'", file_name);

        match db_client::sqlx::query(query).fetch_all(&pool).await {
            Ok(_) => {
                tokio::fs::remove_file(format!("./files/{}", file_name))
                    .await
                    .map_err(|e| {
                        eprint!("error deleting file: {}", e);
                        warp::reject::reject()
                    });
                true
            }
            Err(err) => {
                println!("ERROR: {:?}", err);
                false
            }
        }
    }
}
