
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "closet" (
	"id" SERIAL PRIMARY KEY,	
	"clothingItem" int
);

CREATE TABLE "clothing_item" (
    "id" SERIAL PRIMARY KEY,
    "description" character varying(50) NOT NULL,
    "type" integer,
    "wearing" bit(1) DEFAULT '0'::"bit"
);

CREATE TABLE "clothing_join" (
    "id" SERIAL PRIMARY KEY,
    "shirt" integer REFERENCES shirt(id),
    "pant" integer REFERENCES pant(id)
);

CREATE TABLE "outfit" (
    "id" SERIAL PRIMARY KEY,
    "shirt" integer REFERENCES shirt(id),
    "pant" integer REFERENCES pant(id)
);

CREATE TABLE "pant" (
    "id" SERIAL PRIMARY KEY,
    "clothingType" integer DEFAULT 2,
    "icon" VARCHAR (1000) DEFAULT '| |',
    "fit" VARCHAR (50) NOT NULL,
    "color" VARCHAR (50) NOT NULL,
    "cut" VARCHAR (50) NOT NULL,
    "legLength" VARCHAR (50) NOT NULL
);

CREATE TABLE "story" (
    "id" SERIAL PRIMARY KEY,
    "senario" VARCHAR (1000) NOT NULL
);

CREATE TABLE "shirt" (
    "id" SERIAL PRIMARY KEY,
    "clothingType" integer DEFAULT 1,
    "icon" VARCHAR (1000)  DEFAULT '-u-',
    "fit" VARCHAR (50) NOT NULL,
    "color" VARCHAR (50) NOT NULL,
    "neck" VARCHAR (50) NOT NULL,
    "sleeveLength" VARCHAR (50) NOT NULL
);

CREATE TABLE "story" (
    "id" SERIAL PRIMARY KEY,
    "senario" VARCHAR(1000) NOT NULL
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(80) NOT NULL UNIQUE,
    "password" VARCHAR(1000) NOT NULL,
    "closet" integer REFERENCES closet(id),
    "storyState" integer REFERENCES story(id),
    "outfit" integer REFERENCES outfit(id)
);





INSERT INTO shirt 	("fit", 		"color", 					"neck", 		"sleeveLength")
VALUES 				('loose', 		'grey', 					'scoop neck', 	'cap sleeve'), 
	 				('tight', 		'black', 					'turtleneck', 	'long'), 
	 				('baggy', 		'white', 					'cardigan', 	'knuckles'), 
	 				('fitted', 		'orange pattern', 			'peterpan', 	'sleevless'), 
	 				('fitted', 		'white', 					'button up', 	'short'), 
	 				('normals', 	'grey', 					'ring', 		'short');
	 				
INSERT INTO pant 	("fit", 		"color", 					"cut", 			"legLength")
VALUES 				('tight', 		'jeans', 					'slim', 		'heel'), 
	 				('normals', 	'red with white stripe', 	'70s', 			'thigh'), 
	 				('fitted', 		'darkwash jeans', 			'slim', 		'heel'), 
	 				('loose', 		'purple', 					'bellbottoms', 	'ankle'), 
	 				('sad tight', 	'black', 					'slacks', 		'high rise'), 
	 				('saggy', 		'acid wash jeans', 			'bootcut', 		'heel');
		
INSERT INTO story ("senario")
VALUES 	('steve says hi'), 
		('lets go do stuff'), 
		('look at that!'),
		('what a cool hat'), 
		('where am i'), 
		('who are you and what is that');