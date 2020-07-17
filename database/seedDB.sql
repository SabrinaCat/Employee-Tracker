-- delete db if it exists then create new database
DROP DATABASE IF EXISTS employee_tracking;
CREATE database employee_tracking;
-- use db we created
USE employee_tracking;
-- create department table
create table DEPARTMENTS (
    id int auto_increment not null primary key,
    department_name Varchar (30) not null,
    manager_name varchar (20)
) 
-- populate with sample data
insert into DEPARTMENTS (id, department_name, manager_name)
values (1, 'Human Resources', 'Pam Poovey'), (2, 'Accounting', 'Cyril Figgis'), (3, 'Research', 'Dr.Krieger'), (4, 'Daily Operations', 'Ray Gillette'), (5,'*Top Secret*', 'Mallory Archer')


CREATE table ROLES (
id int not null auto_increment PRIMARY KEY,
title VARCHAR(30) not null,
salary decimal(8,2) not null,
department_id int not null-- will import from department
)
insert into ROLES (id, title, salary, department_id)
values (1, 'Director of Human Resources', 60,000.00, 1), (2, 'Chief Accounting Officer', 60,000.00, 2), (3, 'Head Researcher', 40,000.00, 4), (4, 'Office Manager', 45,000.00, 4), (5, 'Secret Agent', 120,000.00, 5)
create table EMPLOYEES (
   id int not null auto_increment primary key,
   first_name varchar(30) not null,
   last_name varchar(30) not null,
   role_id int not null,-- id will import from roles tables
   manager_id int -- may be null if no manager
)
