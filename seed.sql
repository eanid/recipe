
CREATE TABLE recipes(
	id VARCHAR UNIQUE,
	title VARCHAR NOT NULL,
	ingredient TEXT NOT NULL,
	photo VARCHAR,
	created_at TIMESTAMP
);

INSERT INTO recipes (id,title,ingredient,photo,created_at) VALUES ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed','egg yolk','egg, salt, oil','https://placehold.co/600x400',NOW());

SELECT * FROM recipes;