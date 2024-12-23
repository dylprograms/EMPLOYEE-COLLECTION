import inquirer from 'inquirer';
import Db from './db/index.js';
import logo from 'asciiart-logo';
const db = new Db();
init();
function init() {
    const labelDisplay = logo({ name: 'Employee Collection' }).render();
    console.log(labelDisplay);
    MainPage();
}
function MainPage() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What information do need or want to add?',
            choices: [
                {
                    name: 'Show All Employees',
                    value: 'SHOW_EMPLOYEES',
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE',
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE',
                },
                {
                    name: 'Show All Roles',
                    value: 'SHOW_ROLES',
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE',
                },
                {
                    name: 'Show All Departments',
                    value: 'SHOW_DEPARTMENTS',
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT',
                },
                {
                    name: 'Quit',
                    value: 'QUIT',
                },
            ],
        },
    ]).then((res) => {
        const choice = res.choice;
        switch (choice) {
            case 'SHOW_EMPLOYEES':
                showEmployees();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            case 'Show_DEPARTMENTS':
                showDepartments();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'SHOW_ROLES':
                showRoles();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            default:
                quit();
        }
    });
}
function showEmployees() {
    db.findEveryEmployee()
        .then(({ rows }) => {
        const employees = rows;
        console.log('\n');
        console.table(employees);
    })
        .then(() => MainPage());
}
function updateEmployeeRole() {
    db.findEveryEmployee().then(({ rows }) => {
        const employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: "Choose an employee's role do you want to update?",
                choices: employeeChoices,
            },
        ]).then((res) => {
            const employeeId = res.employeeId;
            db.findEveryRole().then(({ rows }) => {
                const roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id,
                }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Which role do you want to assign the selected employee?',
                        choices: roleChoices,
                    },
                ])
                    .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
                    .then(() => console.log("Updated employee's role"))
                    .then(() => MainPage());
            });
        });
    });
}
function showRoles() {
    db.findEveryRole()
        .then(({ rows }) => {
        const roles = rows;
        console.log('\n');
        console.table(roles);
    })
        .then(() => MainPage());
}
function addRole() {
    db.findEveryDepartment().then(({ rows }) => {
        const departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id,
        }));
        inquirer.prompt([
            {
                name: 'title',
                message: 'Add the name of the role',
            },
            {
                name: 'salary',
                message: 'Add the salary of the role',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What is the department that this role belongs to?',
                choices: departmentChoices,
            },
        ]).then((role) => {
            db.createRole(role)
                .then(() => console.log(`Added ${role.title} to the database`))
                .then(() => MainPage());
        });
    });
}
function showDepartments() {
    db.findEveryDepartment()
        .then(({ rows }) => {
        const departments = rows;
        console.log('\n');
        console.table(departments);
    })
        .then(() => MainPage());
}
function addDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the name of the department?',
        },
    ]).then((res) => {
        const name = res;
        db.createDepartment(name)
            .then(() => console.log(`Added ${name.name} to the database`))
            .then(() => MainPage());
    });
}
function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            message: "Add employee's first name",
        },
        {
            name: 'last_name',
            message: "Add employee's last name",
        },
    ]).then((res) => {
        const firstName = res.first_name;
        const lastName = res.last_name;
        db.findEveryRole().then(({ rows }) => {
            const roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id,
            }));
            inquirer.prompt({
                type: 'list',
                name: 'roleId',
                message: "Give the employee a role",
                choices: roleChoices,
            }).then((res) => {
                const roleId = res.roleId;
                db.findEveryEmployee().then(({ rows }) => {
                    const employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id,
                    }));
                    managerChoices.unshift({ name: 'None', value: null });
                    inquirer.prompt({
                        type: 'list',
                        name: 'managerId',
                        message: "Choose the employee's manager",
                        choices: managerChoices,
                    })
                        .then((res) => {
                        const employee = {
                            manager_id: res.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName,
                        };
                        db.makeEmployee(employee);
                    })
                        .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
                        .then(() => MainPage());
                });
            });
        });
    });
}
function quit() {
    console.log('Have a good Day!');
    process.exit();
}
