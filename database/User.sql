drop table if exists user;
create table user (
userid int(8) not null auto_increment,
username varchar(16) not null,
useremail varchar(32) not null,
userpwd varchar(16) not null,
userstatus int(1) not null default 1,
primary key (userid)
);