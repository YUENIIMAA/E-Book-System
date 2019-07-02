drop table if exists orders;
create table orders (
orderid int(8) not null auto_increment,
userid int(8) not null,
username varchar(16) not null,
bookid int(8) not null,
bookname varchar(255) not null,
bookprice numeric(8,2) not null default 0,
booknumber int(4) not null,
orderdate date,
primary key (orderid)
);