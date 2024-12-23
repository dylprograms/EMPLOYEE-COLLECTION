\c employees

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
    ('Operations Manager', 130000, 3),
    ('Logistics Specialist', 95000, 3),
    ('HR Manager', 120000, 1),
    ('Recruiter', 70000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Alice', 'Smith', 1, NULL),
    ('David', 'Johnson', 2, 1),
    ('Emma', 'Garcia', 3, NULL),
    ('Michael', 'Lee', 4, 3),
    ('Sophia', 'Martinez', 5, NULL),
    ('James', 'Clark', 4, 5),
    ('Olivia', 'Lewis', 7, NULL),
    ('William', 'Walker', 8, 7);
