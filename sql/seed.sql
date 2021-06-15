-- DEPARTMENTS ==============================
-- id - INT PRIMARY KEY
-- name - VARCHAR(30) to hold department name
USE employees_db;
INSERT INTO departments (id, dept_name) VALUES (1, 'Engineering');
INSERT INTO departments (id, dept_name) VALUES (2, 'Sales');
INSERT INTO departments (id, dept_name) VALUES (3, 'Finance');
INSERT INTO departments (id, dept_name) VALUES (4, 'Legal');
INSERT INTO departments (id, dept_name) VALUES (10, 'Human Resources');

-- ROLES ==============================
-- id - INT PRIMARY KEY
-- title - VARCHAR(30) to hold role title
-- salary - DECIMAL to hold role salary
-- department_id - INT to hold reference to department role belongs to employee:
USE employees_db;
INSERT INTO roles (title, salary, department_id) VALUES ("Lead Engineer", 150000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Engineer", 125000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Sales Mgr.", 138500, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Online Sales Rep.", 112000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Print Sales Rep.", 143000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Comptroller", 169000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Accountant", 138000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Billing Coordinator", 122000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Lawyer", 145000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ("Operations Mgr.", 145000, 10);
INSERT INTO roles (title, salary, department_id) VALUES ("HR Coordinator", 110000, 10);

-- EMPLOYEES =========================================
-- id - INT PRIMARY KEY
-- first_name - VARCHAR(30) to hold employee first name
-- last_name - VARCHAR(30) to hold employee last name
-- role_id - INT to hold reference to role employee has
-- manager_id - INT to hold reference to another employee that manager of the current employee.
                -- This field may be null if the employee has no manager.

-- Seed Employees Info =================================================================================
USE employees_db;
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Coltrane',1, null );
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Lester', 'Young', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Ella', 'Fitzgerald', 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('William', 'Basie', 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Benny', 'Goodman',5, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Charlie', 'Parker', 6, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Vaughn', 7, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Sonny', 'Rollins', 8, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Clark', 'Terry', 9, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Carmen', 'McRae', 10, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Edward', 'Ellington', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Thomas', 'Waller', 11, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Gillespie', 7, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Shirley', 'Horn', 2, 1);