drop table if exists shoppingcart;
create table shoppingcart (
cartid int(8) not null auto_increment,
userid int(8) not null,
bookid int(8) not null,
cartnumber int(4) not null default 1,
primary key (cartid)
);