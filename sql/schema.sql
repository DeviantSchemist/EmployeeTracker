DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;
CREATE TABLE departments (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(30) NOT NULL
);

USE employees_db;
CREATE TABLE roles (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

USE employees_db;
CREATE TABLE employees (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (manager_id) REFERENCES employees (id)
);