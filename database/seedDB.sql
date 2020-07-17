-- delete db if it exists then create new database
DROP DATABASE IF EXISTS employee_tracking;
CREATE database employee_tracking;
-- use db we created
USE employee_tracking;
-- create department table
create table DEPARTMENTS (
    id int not null primary key,
    department_name Varchar (30) not null,
    manager_name varchar (20)
) 
-- populate with sample data
insert into departments (id, department_name, manager_name)
values (1, 'Human Resources', 'Pam Poovey') (2, )


CREATE table ROLES (
id int not null auto_increment PRIMARY KEY,
title VARCHAR(30) not null,
salary decimal(8,2) not null,
department_id int not null-- will import from department
)
create table EMPLOYEES (
   id int not null auto_increment primary key,
   first_name varchar(30) not null,
   last_name varchar(30) not null,
   role_id int not null,-- id will import from roles tables
   manager_id int -- may be null if no manager
)
