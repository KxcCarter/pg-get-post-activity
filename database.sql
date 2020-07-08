CREATE TABLE "books" (
	"id" SERIAL PRIMARY KEY,
	"title" varchar(250) NOT NULL,
	"author" varchar(100) NOT NULL,
	"published" DATE
	);
	

	-- Sample Data --
	
insert into books (title, author, published)
values ('Revenge of the Trees', 'John Bookman', '7-2-1870');
	
	
CREATE TABLE "magazines" (
	"id" SERIAL PRIMARY KEY,
	"title" varchar(250) NOT NULL,
	"issue_number" INT NOT NULL,
	"pages" INT
	);

	-- Sample Data -- 

insert into magazines (title, issue_number, pages)
values ('1000 and 1 ways to get a paper cut', 27, 1001);