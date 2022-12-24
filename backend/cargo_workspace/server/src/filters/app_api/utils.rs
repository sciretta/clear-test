use db_client::sqlx::Row;

use super::mutation::User;

pub async fn get_user_by_name(username: String) -> Option<User> {
    let pool = db_client::connect()
        .await
        .expect("Failed to connect to database.");

    let query: &str = &format!("select * from users where username='{}';", username);

    match db_client::sqlx::query(query).fetch_all(&pool).await {
        Ok(res) => {
            if res.len() == 0 {
                return None;
            }
            Some(User {
                username: res[0].get::<String, _>("username"),
                id: res[0].get::<i32, _>("id").to_string(),
            })
        }
        Err(_) => None,
    }
}
