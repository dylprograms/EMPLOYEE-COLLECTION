DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

\c employees

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INTEGER,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

INSERT INTO department
    (name)
VALUES
    ('Marketing'),
    ('Technology'),
    ('Operations'),
    ('Human Resources');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Marketing Manager', 110000, 1),
    ('Content Strategist', 85000, 1),
    ('Tech Lead', 140000, 2),
    ('Backend Developer', 115000, 2),
    ('Operations Manager', 130000, 3);

