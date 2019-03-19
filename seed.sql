DROP DATABASE IF EXISTS silkroad;
CREATE DATABASE silkroad;

\c silkroad;

CREATE TABLE members
(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    PASSWORD VARCHAR NOT NULL,
    token VARCHAR NULL,
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL,
    caption VARCHAR(255),
    date_created DATE NOT NULL,
    date_updated DATE,
    FOREIGN KEY (member_id) REFERENCES members(id),
);

CREATE TABLE likes
(
    member_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),

);

CREATE TABLE messages
(

);
