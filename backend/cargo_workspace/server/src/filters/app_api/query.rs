use super::{context::Context, mutation::UserInput};
use db_client::sqlx::Row;
use juniper::{graphql_object, GraphQLObject};

#[derive(GraphQLObject)]
pub struct Image {
    pub file_name: String,
    pub owner_username: String,
}

pub struct Query;

#[graphql_object(context = Context)]
impl Query {
    async fn user_images(ctx: &Context, user: UserInput) -> Vec<Image> {
        let pool = db_client::connect()
            .await
            .expect("Failed to connect to database.");

        let query: &str = &format!(
            "select * from images where owner_username='{}';",
            user.username
        );

        let rows = db_client::sqlx::query(query)
            .fetch_all(&pool)
            .await
            .unwrap();

        let res = rows
            .iter()
            .map(|r| Image {
                file_name: r.get::<String, _>("file_name"),
                owner_username: r.get::<String, _>("owner_username"),
            })
            .collect::<Vec<Image>>();

        res
    }
}
