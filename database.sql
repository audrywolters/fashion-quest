SELECT  s."clothingType", s.color, s.fit, s.icon, s.neck, s."sleeveLength",
	    p."clothingType", p.color, p.fit, p.icon, p.cut,  p."legLength"
FROM 	"user" as u
JOIN 	outfit as o on o.id       = u.outfit
JOIN 	shirt  as s on o.shirt_id = s.id
JOIN 	pant   as p on o.pant_id  = p.id
WHERE 	u.id = 1;

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


INSERT INTO "clothing_item" ("description", "type", "join")
					 VALUES  ('bowie',		1,		13),
					 		 ('cool',		2,		21),
					 		 ('oh no',		2,		24);

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