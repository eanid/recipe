-- Active: 1698635336323@@147.139.210.135@5432@b16@public

CREATE TABLE recipes(
	id VARCHAR UNIQUE,
	title VARCHAR NOT NULL,
	ingredient TEXT NOT NULL,
	photo VARCHAR,
	created_at TIMESTAMP
);

INSERT INTO recipes (id,title,ingredient,photo,created_at) VALUES ('1bd6bc-bfd-4b2-9b5d-ab8dfbd4bd','fried egg','egg, salt, oil','https://placehold.co/600x400',NOW());

SELECT * FROM recipes;
ALTER TABLE recipes ADD COLUMN updated_at TIMESTAMP;

UPDATE recipes SET updated_at=NOW();

SELECT title, EXTRACT(DAY FROM created_at) as create ,EXTRACT(DAY FROM updated_at) as update FROM recipes ORDER BY created_at DESC;

SELECT * FROM recipes WHERE title LIKE 'egg yolk';
SELECT * FROM recipes WHERE title ILIKE '%fried%';
SELECT * FROM recipes WHERE ingredient ILIKE '%rice%';
SELECT * FROM recipes WHERE title ILIKE '%fried%' ORDER BY updated_at DESC;

SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3;

SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 0;
SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 3;
SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 6;
SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 3;
SELECT * FROM recipes ORDER BY created_at DESC LIMIT 3 OFFSET 6;
SELECT COUNT(*) FROM recipes;

SELECT * FROM recipes WHERE title ILIKE '%%' ORDER BY updated_at DESC LIMIT 3 OFFSET 0;
SELECT COUNT(*) FROM recipes WHERE title ILIKE '%%';
-- 8
-- 8/3 = 2.xxx = 3
-- 3 total page = last page