-- delete db if it exists then create new database
DROP DATABASE IF EXISTS employee_tracking;
CREATE database employee_tracking;
-- use db we created
USE employee_tracking;
-- create department table
create table DEPARTMENTS (
    id int not null  auto_increment primary key,
    department_name Varchar (30) not null
);
-- populate with sample data
insert into DEPARTMENTS (id, department_name)
values (1,'Human Resources'), (2,'Accounting'), (3,'Research'), (4,'Daily Operations'), (5,'*Top Secret*')


CREATE table ROLES (
id int not null auto_increment PRIMARY KEY,
title VARCHAR(30) not null,
salary decimal(8,2) not null,
department_id int not null,  -- will import from departments table
FOREIGN KEY (department_id) REFERENCES DEPARTMENTS(id)
);
insert into ROLES (title, salary, department_id)
values ('Human Resources Officer', 60000.00,1), ('Accountant', 60000.00, 2), ('Gadget Researcher', 40000.00, 3), ('Office Worker', 45000.00, 4), ('Secret Agent', 120000.00, 5)

create table EMPLOYEES (
   id int not null auto_increment primary key,
   first_name varchar(30) not null,
   last_name varchar(30) not null,
   role_id int not null,-- id will import from roles tables
   manager_id int, -- may be null if not a manager
   FOREIGN KEY (manager_id) REFERENCES employee(id)
)
insert into EMPLOYEES (first_name,last_name, role_id, manager_id)
values ('Mallory', 'Archer', 5, 1), ('Pam', 'Poovey', 1, 2), ('Cyril', 'Figgis', 2, 3);

insert into EMPLOYEES (first_name, last_name, role_id) 
values ('Sterling', 'Archer', 5), ('Lana', 'Kane', 5), ('Ray', 'Gillette', 4), ('Dr. Hans', 'Krieger',4), ('Cheryl/Carol/Charlene', 'Tunt', 4)