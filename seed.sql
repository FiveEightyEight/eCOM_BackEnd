DROP DATABASE IF EXISTS silkroad;
CREATE DATABASE silkroad;

\c silkroad;

CREATE TABLE members
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    date_created TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    token VARCHAR
);

CREATE TABLE messages
(
    id SERIAL PRIMARY KEY,
    author_id INT NOT NULL,
    recipient_id INT NOT NULL,
    message VARCHAR(255),
    date_created TIMESTAMP NOT NULL,
    date_updated TIMESTAMP,
    CONSTRAINT author_id_fkey 
    FOREIGN KEY (author_id) REFERENCES members(id)
    ON DELETE NO ACTION,
    CONSTRAINT recipient_id_fkey 
    FOREIGN KEY (recipient_id) REFERENCES members(id)
    ON DELETE NO ACTION
);

CREATE TABLE replies
( 
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL,
    message_id INT NOT NULL,
    caption VARCHAR(255),
    date_created TIMESTAMP NOT NULL,
    date_updated TIMESTAMP,
    CONSTRAINT member_id_fkey 
    FOREIGN KEY (member_id) REFERENCES members(id)
    ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT message_id_fkey 
    FOREIGN KEY (message_id) REFERENCES messages(id)
    ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE posts
( 
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL,
    caption VARCHAR(255),
    date_created TIMESTAMP NOT NULL,
    date_updated TIMESTAMP,
    CONSTRAINT member_id_fkey 
    FOREIGN KEY (member_id) REFERENCES members(id)
    ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE comments
( 
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL,
    post_id INT NOT NULL,
    caption VARCHAR(255),
    date_created TIMESTAMP NOT NULL,
    date_updated TIMESTAMP,
    CONSTRAINT member_id_fkey 
    FOREIGN KEY (member_id) REFERENCES members(id)
    ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT post_id_fkey 
    FOREIGN KEY (post_id) REFERENCES posts(id)
    ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE items
( 
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL,
    caption VARCHAR(255),
    image VARCHAR,
    price FLOAT,
    post_id INT NOT NULL,
    date_created TIMESTAMP NOT NULL,
    date_updated TIMESTAMP,
    CONSTRAINT member_id_fkey 
    FOREIGN KEY (member_id) REFERENCES members(id)
    ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT post_id_fkey 
    FOREIGN KEY (post_id) REFERENCES posts(id)
    ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE likes
(
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL,
    post_id INT NOT NULL,
    date_created TIMESTAMP NOT NULL,
    CONSTRAINT U_like UNIQUE (member_id,post_id),
    CONSTRAINT member_id_fkey 
    FOREIGN KEY (member_id) REFERENCES members(id)
    ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT post_id_fkey 
    FOREIGN KEY (post_id) REFERENCES posts(id)
    ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE follows
(
    id SERIAL PRIMARY KEY,
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    date_created TIMESTAMP NOT NULL,
    CONSTRAINT U_follow UNIQUE (follower_id,followed_id),
    CONSTRAINT follower_id_fkey 
    FOREIGN KEY (follower_id) REFERENCES members(id)
    ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT followed_id_fkey 
    FOREIGN KEY (followed_id) REFERENCES members(id)
    ON UPDATE NO ACTION ON DELETE CASCADE
);