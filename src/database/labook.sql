CREATE TABLE users(
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE posts (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    updated_ate INTEGER NOT NULL,

    Foreign Key (creator_id) REFERENCES users(id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,

    Foreign Key (user_id) REFERENCES users(id),
    Foreign Key (post_id) REFERENCES posts(id)
)