DROP TABLE IF EXISTS users_choices CASCADE;

CREATE TABLE users_choices (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  choice_id INTEGER REFERENCES choices(id),
  rank SMALLINT
);
