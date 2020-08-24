CREATE TABLE closet (
    id SERIAL PRIMARY KEY,
    closet_id integer,
    clothing_item integer,
    wearing boolean DEFAULT false
);

CREATE TABLE clothing_item (
    id SERIAL PRIMARY KEY,
    type integer,
    icon character varying(50),
    fit character varying(50),
    color character varying(50),
    length character varying(50),
    feature character varying(50)
);

CREATE TABLE outfit (
    id SERIAL PRIMARY KEY,
    outfit_id integer,
    clothing_item integer
);

CREATE TABLE story (
    id SERIAL PRIMARY KEY,
    senario character varying(1000) NOT NULL
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    closet integer,
    -- TODO: storyState integer REFERENCES story(id),
    outfit integer
);


INSERT INTO closet ("closet_id", "clothing_item", "wearing")
VALUES (1,	25,	TRUE)
       (1,	22,	FALSE)
       (1,	17,	FALSE)
       (1,	15,	TRUE),
       (1,	20,	FALSE);


INSERT INTO clothing_item 	("type",		"icon",			"fit", 			"color", 					"featureA", 	"featureB")
VALUES 						(1,				'______
|_      _|
  |     |
  |___|',		'loose', 		'grey', 					'scoop neck', 	'cap sleeve'), 
			 				(1,				'______
|_      _|
  |     |
  |___|',		'tight', 		'black', 					'turtleneck', 	'long'), 
			 				(1,				'______
|_      _|
  |     |
  |___|',		'baggy', 		'white', 					'cardigan', 	'knuckles'), 
			 				(1,				'______
|_      _|
  |     |
  |___|',		'fitted', 		'orange pattern', 			'peterpan', 	'sleevless'), 
			 				(1,				'______
|_      _|
  |     |
  |___|',		'fitted', 		'white', 					'button up', 	'short'), 
			 				(1,				'______
|_      _|
  |     |
  |___|',		'normals', 		'grey', 					'ring', 		'short'),
			 				(2,				'______
|    ^   |
|   |  |   |
|   |  |   |',		'tight', 		'jeans', 					'slim', 		'heel'), 
			 				(2,				'______
|    ^   |
|   |  |   |
|   |  |   |',		'normals', 		'red with white stripe', 	'70s', 			'thigh'), 
			 				(2,				'______
|    ^   |
|   |  |   |
|   |  |   |',		'fitted', 		'darkwash jeans', 			'slim', 		'heel'), 
			 				(2,				'______
|    ^   |
|   |  |   |
|   |  |   |',		'loose', 		'purple', 					'bellbottoms', 	'ankle'), 
			 				(2,				'______
|    ^   |
|   |  |   |
|   |  |   |',		'sad tight', 	'black', 					'slacks', 		'high rise'), 
			 				(2,				'______
|    ^   |
|   |  |   |
|   |  |   |',		'saggy', 		'acid wash jeans', 			'bootcut', 		'heel');


INSERT INTO outfit ("type", "clothing_item")
VALUES (1,	15),
	   (2,	25);


INSERT INTO story (senario)
VALUES 	('Welcome to FASHION QUEST Let the adventure begin! *hint* to progress the story, type 'ok''), 
		('*ring ring ring*! Your friend Rick is calling.'), 
		('He wants to get coffee. Let''s get dressed. *hint* try typing ''outfit'', ''closet'', or ''change'''),
		('you found an item'), 
		('where am i'), 
		('who are you and what is that');
        