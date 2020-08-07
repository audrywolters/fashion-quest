SELECT i.type, i.icon, i.fit, i.color, i."featureA", i."featureB"
FROM clothing_item as i
JOIN closet as c on c.clothing_item = i.id
JOIN "user" as u on u.closet = c.closet_id
WHERE u.id =1;

CREATE TABLE "closet" (
	"id" SERIAL PRIMARY KEY,	
	"clothingItem" int
);

CREATE TABLE "clothing_item" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR(50),
    "type" integer,
    "wearing" bit(1) DEFAULT '0'::"bit",
    "join" integer REFERENCES clothing_join(id)
);

CREATE TABLE "clothing_join" (
    "id" SERIAL PRIMARY KEY,
    "shirt" integer REFERENCES shirt(id),
    "pant" integer REFERENCES pant(id)
);

CREATE TABLE outfit (
    "id" SERIAL PRIMARY KEY,
    "shirt_id" integer REFERENCES shirt(id),
    "pant_id" integer REFERENCES pant(id)
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
    "closet" integer,
    "storyState" integer REFERENCES story(id),
    "outfit" integer REFERENCES outfit(id)
);

INSERT INTO closet 	("closet_id","clothing_item",	"wearing")
		    VALUES 	(1,			4, 			  		true), 
		    		(1, 		5, 					true), 
		    		(1, 		6, 					false);


INSERT INTO "clothing_join" ("shirt", "pant")
		VALUES 
				(1, NULL),
				(2, NULL),
				(3, NULL),
				(4, NULL),
				(5, NULL),
				(6, NULL),
				(NULL, 1),
				(NULL, 2),
				(NULL, 3),
				(NULL, 4),
				(NULL, 5),
				(NULL, 6);
				
CREATE TABLE "clothing_item" (
    "id" SERIAL PRIMARY KEY,
    "type" int,
    "icon" VARCHAR(50),
    "fit" VARCHAR(50),
    "color" VARCHAR(50),
    "featureA" VARCHAR(50),
    "featureB" VARCHAR(50)
);

INSERT INTO clothing_item 	("type",		"icon",			"fit", 			"color", 					"featureA", 	"featureB")
VALUES 						(1,				'shirt',		'loose', 		'grey', 					'scoop neck', 	'cap sleeve'), 
			 				(1,				'shirt',		'tight', 		'black', 					'turtleneck', 	'long'), 
			 				(1,				'shirt',		'baggy', 		'white', 					'cardigan', 	'knuckles'), 
			 				(1,				'shirt',		'fitted', 		'orange pattern', 			'peterpan', 	'sleevless'), 
			 				(1,				'shirt',		'fitted', 		'white', 					'button up', 	'short'), 
			 				(1,				'shirt',		'normals', 		'grey', 					'ring', 		'short'),
			 				(2,				'| )( |',		'tight', 		'jeans', 					'slim', 		'heel'), 
			 				(2,				'| )( |',		'normals', 		'red with white stripe', 	'70s', 			'thigh'), 
			 				(2,				'| )( |',		'fitted', 		'darkwash jeans', 			'slim', 		'heel'), 
			 				(2,				'| )( |',		'loose', 		'purple', 					'bellbottoms', 	'ankle'), 
			 				(2,				'| )( |',		'sad tight', 	'black', 					'slacks', 		'high rise'), 
			 				(2,				'| )( |',		'saggy', 		'acid wash jeans', 			'bootcut', 		'heel');

INSERT INTO story ("senario")
VALUES 	('steve says hi'), 
		('lets go do stuff'), 
		('look at that!'),
		('what a cool hat'), 
		('where am i'), 
		('who are you and what is that');