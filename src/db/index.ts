import { pool } from './connection.js';
export default class Db {
    constructor() { }
    async query(sql: string, args: any[] = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        }
        finally {
            client.release();
        }
    }
    async findEveryEmployee() {
        return this.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    }
    makeEmployee(employee: any) {
        const { first_name, last_name, role_id, manager_id } = employee;
        return this.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    }
    updateEmployeeRole(employeeId: number, roleId: number) {
        return this.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
            roleId,
            employeeId,
        ]);
    }
    findEveryRole() {
        return this.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;');
    }
    createRole(role: any) {
        const { title, salary, department_id } = role;
        return this.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    }
    findEveryDepartment() {
        return this.query('SELECT department.id, department.name FROM department;');
    }
    createDepartment(department: any) {
        return this.query('INSERT INTO department (name) VALUES ($1)', [
            department.name,
        ]);
    }

}