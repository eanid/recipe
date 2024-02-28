-- Active: 1698635336323@@147.139.210.135@5432@b16@public

CREATE TABLE recipes(
	id VARCHAR UNIQUE,
	title VARCHAR NOT NULL,
	ingredient TEXT NOT NULL,
	photo VARCHAR,
	created_at TIMESTAMP
);

INSERT INTO recipes (id,title,ingredient,photo,created_at) VALUES ('1bd6bc-bfd-4b2d-9b5d-ab8dfbd4bd','egg yolk','egg, salt, oil','https://placehold.co/600x400',NOW());

SELECT * FROM recipes;
ALTER TABLE recipes ADD COLUMN updated_at TIMESTAMP;

UPDATE recipes SET updated_at=NOW();

SELECT title, EXTRACT(DAY FROM created_at) as create ,EXTRACT(DAY FROM updated_at) as update FROM recipes ORDER BY created_at DESC;