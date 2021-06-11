const { prompt } = require('inquirer')
const mysql = require('mysql2')
require('console.table')

const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/employees_db')

const menu = () => {
  prompt ([
    {
      type: 'list',
      name 'action',
      message: 'What would you like to do?',
      choices: ['View all employees', 'View all employees by department', 'View all employees by manager', 'Add employee', 'Remove employee', 'Update employee role', 'Update employee manager']
    }
  ])
}