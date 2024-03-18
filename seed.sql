-- Active: 1698635336323@@147.139.210.135@5432@b16@public

CREATE TABLE recipes (
    id VARCHAR UNIQUE, title VARCHAR NOT NULL, ingredient TEXT NOT NULL, photo VARCHAR, created_at TIMESTAMP
);

INSERT INTO
    recipes (
        id, title, ingredient, photo, created_at
    )
VALUES (
        '1bd6bc-bfd-4b2-9b5d-ab8dfbd4bd', 'fried egg', 'egg, salt, oil', 'https://placehold.co/600x400', NOW()
    );

SELECT * FROM recipes;

ALTER TABLE recipes ADD COLUMN updated_at TIMESTAMP;

UPDATE recipes SET updated_at = NOW();

SELECT title, EXTRACT(
        DAY
        FROM created_at
    ) as create, EXTRACT(
        DAY
        FROM updated_at
    ) as
update
FROM recipes
ORDER BY created_at DESC;

SELECT * FROM recipes WHERE title LIKE 'egg yolk';

SELECT * FROM recipes WHERE title ILIKE '%fried%';

SELECT * FROM recipes WHERE ingredient ILIKE '%rice%';

SELECT *
FROM recipes
WHERE
    title ILIKE '%fried%'
ORDER BY updated_at DESC;

SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3;

SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 0;

SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 3;

SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 6;

SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 3;

SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 6;

SELECT COUNT(*) FROM recipes;

SELECT *
FROM recipes
WHERE
    title ILIKE '%%'
ORDER BY updated_at DESC
LIMIT 3
OFFSET
    0;

SELECT COUNT(*) FROM recipes WHERE title ILIKE '%%';
-- 8
-- 8/3 = 2.xxx = 3
-- 3 total page = last page

--  category
CREATE TABLE category ( id SERIAL PRIMARY KEY, name VARCHAR );

INSERT INTO category (name) VALUES ('main course');

INSERT INTO category (name) VALUES ('dessert');

INSERT INTO category (name) VALUES ('appetizer');

-- add category column to recipe
ALTER TABLE recipes ADD COLUMN category_id INTEGER;

SELECT * FROM recipes;

SELECT * FROM category;
-- update category_id in recipe
UPDATE recipes SET category_id = 1;

UPDATE recipes SET category_id = 2 WHERE title ILIKE '%fried%';
-- get recipe with category
SELECT recipes.id, recipes.title, recipes.ingredient, category.name
FROM recipes
    JOIN category ON recipes.category_id = category.id;
-- users table
CREATE TABLE users (
    id VARCHAR UNIQUE, email VARCHAR NOT NULL, password VARCHAR NOT NULL, photo VARCHAR, created_at TIMESTAMP
);

ALTER TABLE recipes ADD COLUMN users_id VARCHAR;

INSERT INTO
    users (
        id, email, password, photo, created_at
    )
VALUES (
        '1bd6bc-bfd-4b2-9b5d', 'adi@gmail.com', '12345678', 'https://placehold.co/600x400', NOW()
    );

SELECT * FROM users;

UPDATE recipes SET users_id = '1bd6bc-bfd-4b2-9b5d';
-- get recipe with category & user
SELECT recipes.id, recipes.title, recipes.ingredient, category.name, users.email as author
FROM recipes
    JOIN category ON recipes.category_id = category.id
    JOIN users ON recipes.users_id = users.id;

ALTER TABLE recipes ALTER COLUMN users_id SET NOT NULL;
-- new insert recipe
INSERT INTO
    recipes (
        id, title, ingredient, photo, created_at, users_id, category_id
    )
VALUES (
        'bfd-4b2-9b5d-ab8bd4bd', 'fried fish', 'egg, salt, oil', 'https://placehold.co/600x400', NOW(), '1bd6bc-bfd-4b2-9b5d', 2
    );

UPDATE recipes SET category_id = 3 WHERE id = 'bfd-4b2-9b5d-ab8dfbd4bd';

ALTER TABLE recipes ALTER COLUMN category_id SET NOT NULL;
-- binding
ALTER TABLE recipes ADD CONSTRAINT fk_recipes_users FOREIGN KEY (users_id) REFERENCES users (id);
ALTER TABLE recipes ADD CONSTRAINT fk_recipes_category FOREIGN KEY (category_id) REFERENCES category (id);
-- new insert recipe check
INSERT INTO
    recipes (
        id, title, ingredient, photo, created_at, users_id, category_id
    )
VALUES (
        'bfd-4b2-9b5d-ab8b++d4bd', 'fried fish', 'egg, salt, oil', 'https://placehold.co/600x400', NOW(), '1bd6bc-bfd-4b2-9b5d', 1
    );

-- finish binding 3 table
SELECT * FROM users WHERE email='adi@gmail.com';
INSERT INTO
    users (
        id, email, password, created_at
    )
VALUES (
        '1bd6bc-bfd-4b2-9b5d', 'adi@gmail.com', '12345678', NOW()
    );

-- email users

ALTER TABLE users ADD COLUMN name VARCHAR;
ALTER TABLE users ADD COLUMN is_verif BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN otp VARCHAR;