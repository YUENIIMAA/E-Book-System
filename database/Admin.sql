drop table if exists admin;
create table admin (
adminid int(8) not null auto_increment,
adminname varchar (16) not null,
adminpwd varchar(16) not null,
primary key (adminid) 
);