// const express = require('express')
// const app = express()
// const { join } = require('path')
const { prompt } = require('inquirer')
const db = require('./db')
require('console.table')

// app.use(express.static(join(__dirname, 'public')))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.use(require('./routes'))

const contCheck = () => {
  prompt({
    type: 'confirm',
    name: 'choice',
    message: 'Continue?'
  })
    .then(({ choice }) => choice ? menu() : process.exit())
    .catch(err => console.log(err))
}

async function getEmployees() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT employees.id AS id, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Title, departments.dept_name AS Department, roles.salary AS Salary, manager.first_name || \' \' || manager.last_name AS Manager FROM employees LEFT JOIN employees manager ON manager.id = employees.manager_id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.id', (err, employees) => {
      if (err) {reject(err)}
      resolve(employees)
    })
  })
  return response
}

async function getEmployeesByDept() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, departments.dept_name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY departments.id', (err, employees) => {
      if (err) {reject(err)}
      resolve(employees)
    })
  })
  return response
}

async function getEmployeesByManager() {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, manager.first_name || \' \' || manager.last_name AS Manager FROM employees JOIN employees manager ON manager.id = employees.manager_id', (err, employees) => {
      if (err) {reject(err)}
      resolve(employees)
    })
  })
  return response
}

const viewEmployees = () => {
  getEmployees()
    .then(employees => {
      console.table(employees)
      contCheck()
    })
    .catch(err => console.log(err))
}

const viewEmployeesByDept = () => {
  getEmployeesByDept()
    .then(employees => {
      console.table(employees)
      contCheck()
    })
    .catch(err => console.log(err))
}

const viewEmployeesByManager = () => {
  getEmployeesByManager()
    .then(employees => {
      console.table(employees)
      contCheck()
    })
    .catch(err => console.log(err))
}

const createEmployee = () => {
  prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the employee\'s first name?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employee\'s last name?'
    },
    {
      type: 'input',
      name: 'role',
      message: 'What is the employee\s role?'
    },
    {
      type: 'input',
      name: 'manager',
      message: 'Who is the employee\s manager?'
    }
  ])
  .then(employee => {
    db.query('INSERT INTO employees SET ?', employee, err => {
      if (err) {console.log(err)}
      console.log('Added employee to database.')
      contCheck()
    })
  })
  .catch(err => console.log(err))
}

const deleteEmployee = () => {
  getEmployees()
    .then(employees => {
      prompt({
          type: 'list',
          name: 'id',
          message: 'Who do you want to remove?',
          choices: employees.map(employee => ({
            firstName: employee.firstName,
            value: employee.id
          }))
        })
        .then(id => {
          db.query('DELETE FROM employees WHERE ?', id, err => {
            if (err) {console.log(err)}
            console.log('Employee deleted!')
            contCheck()
          })
        })
    })
    .catch(err => console.log(err))
}

// MENU FOR THE USER INPUT
const menu = () => {
  prompt ([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View all employees', 'View all employees by department', 'View all employees by manager', 'Add employee', 'Remove employee', 'Update employee role', 'Update employee manager', 'EXIT']
    }
  ])
  .then (answers => {
    switch(answers.action) {
      case 'View all employees':
        viewEmployees()
        break
      case 'View all employees by department':
        viewEmployeesByDept()
        break
      case 'View all employees by manager':
        viewEmployeesByManager()
        break
      case 'Add employee':
        createEmployee()
        break
      case 'Remove employee':
        deleteEmployee()
        break
      case 'EXIT':
        process.exit()
    }
  })
  .catch(err => console.error(err))
}

menu()


// app.listen(process.env.PORT || 3000)