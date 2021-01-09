DROP TABLE IF EXISTS polls_users CASCADE;

CREATE TABLE polls_users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  poll_id INTEGER REFERENCES polls(id)
);
