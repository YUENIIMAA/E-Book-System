drop table if exists book;
create table book (
bookid int(8) not null auto_increment,
bookisbn varchar(13) not null,
bookname varchar(255) not null,
bookauthor varchar(255) not null,
bookprice numeric(8,2) not null default 0,
bookstock int(4) not null default 9999,
booksales int(4) not null default 0,
bookviews int(4) not null default 0,
primary key (bookid)
);