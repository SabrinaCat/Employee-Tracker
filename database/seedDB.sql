-- delete db if it exists then create new database
DROP DATABASE IF EXISTS employee_tracking;
CREATE database employee_tracking;
-- use db we created
USE employee_tracking;
-- create department table
create table DEPARTMENTS (
    id int not null  auto_increment primary key,
    department_name Varchar (30) not null,
    manager_name varchar (20)
) 
-- populate with sample data
insert into DEPARTMENTS (department_name, manager_name)
values ('Human Resources', 'Pam Poovey'), ('Accounting', 'Cyril Figgis'), ('Research', 'Dr.Krieger'), ('Daily Operations', 'Ray Gillette'), ('*Top Secret*', 'Mallory Archer')


CREATE table ROLES (
id int not null auto_increment PRIMARY KEY,
title VARCHAR(30) not null,
salary decimal(8,2) not null,
department_id int not null-- will import from department
FOREIGN KEY (department_id) REFERENCES department(id)
)
insert into ROLES (title, salary, department_id)
values (1, 'Director of Human Resources', 60,000.00, 1), (2, 'Chief Accounting Officer', 60,000.00, 2), (3, 'Head Researcher', 40,000.00, 4), (4, 'Office Manager', 45,000.00, 4), (5, 'Secret Agent', 120,000.00, 5)

create table EMPLOYEES (
   id int not null auto_increment primary key,
   first_name varchar(30) not null,
   last_name varchar(30) not null,
   role_id int not null,-- id will import from roles tables
   manager_id int -- may be null if no manager
   FOREIGN KEY (manager_id) REFERENCES employee(id)
)
insert into EMPLOYEES (id, first_name,last_name, role_id, manager_id)
values (id, 'Sterling', 'Archer', 5, 5 )