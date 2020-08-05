
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "closet" (
	"id" SERIAL PRIMARY KEY,	
	"clothingItem" int
);

CREATE TABLE "story" (
    "id" SERIAL PRIMARY KEY,
    "senario" VARCHAR (1000) NOT NULL
);

INSERT INTO story ("senario")
VALUES 	('steve says hi'), 
		('lets go do stuff'), 
		('look at that!'),
		('what a cool hat'), 
		('where am i'), 
		('who are you and what is that');