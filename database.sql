CREATE TABLE "books" (
	"id" SERIAL PRIMARY KEY,
	"title" varchar(250) NOT NULL,
	"author" varchar(100) NOT NULL,
	"published" DATE
	);