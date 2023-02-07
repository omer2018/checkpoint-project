CREATE DATABASE cp_project;

USE cp_project;

CREATE TABLE Students (
  ID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  First_name varchar(255) NOT NULL,
  Last_name varchar(255) NOT NULL,
  Email varchar(255) NOT NULL,
  Department enum('HR', 'Accounting', 'Sales') NOT NULL
);
