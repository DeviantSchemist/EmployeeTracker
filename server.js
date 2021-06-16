const inquirer = require('inquirer')
const { prompt } = require('inquirer')
const Choices = require('inquirer/lib/objects/choices')
const db = require('./db')
require('console.table')

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
    db.query('SELECT employees.id AS id, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Title, departments.dept_name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employees LEFT JOIN employees manager ON manager.id = employees.manager_id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.id', (err, employees) => {
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
    db.query('SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, CONCAT(manager.first_name, " ", manager.last_name) AS Manager FROM employees JOIN employees manager ON manager.id = employees.manager_id', (err, employees) => {
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

const roleArray = []
const pickRole = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) {console.log(err)}
    for (let i = 0; i < roles.length; i++) {
      roleArray.push(roles[i].title)
    }
  })
  return roleArray
}

const managerArray = []
const pickManager = () => {
  db.query('SELECT * FROM employees WHERE manager_id IS NULL', (err, managers) => {
    if (err) {console.log(err)}
    for (let i = 0; i < managers.length; i++) {
      managerArray.push(managers[i].first_name)
    }
  })
  return managerArray
}

const deptArray = []
const pickDepartment = () => {
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) {console.log(err)}
    for (let i = 0; i < departments.length; i++) {
      deptArray.push(departments[i].dept_name)
    }
  })
  return deptArray
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
      type: 'list',
      name: 'role',
      message: 'What is the employee\'s role?',
      choices: pickRole()
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is the employee\'s manager?',
      choices: pickManager()
    }
  ])
  .then(employee => {
    // add employee here
    let roleID = pickRole().indexOf(employee.role)+1
    let managerID = pickManager().indexOf(employee.manager)+1
    db.query('INSERT INTO employees SET ?', 
    {
      first_name: employee.firstName,
      last_name: employee.lastName,
      role_id: roleID,
      manager_id: managerID 
    }, err => {
      if (err) {console.log(err)}
      console.log('Employee added to database!')
      contCheck()
    })
  })
  .catch(err => console.log(err))
}

const updateEmployeeRole = () => {
  db.query('SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.role_id = roles.id', (err, employeeRoles) => {
    if (err) {console.log(err)}
    prompt([
      {
        type: 'list',
        name: 'lastName',
        choices: () => {
          let lastNameArray = []
          for (let i = 0; i < employeeRoles.length; i++) {
            lastNameArray.push(employeeRoles[i].last_name)
          }
          return lastNameArray
        },
        messsage: 'What is the employee\'s last name?'
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the employee\'s new role?',
        choices: pickRole()
      }
    ])
    .then(response => {
      let roleID = pickRole().indexOf(response.role)+1
      db.query('UPDATE employees SET ? WHERE ?', { role_id: roleID }, {last_name: response.lastName}, err => {
          if (err) {console.log(err)}
          console.log('Updated employee!')
          contCheck()
        })
    })
    .catch(err => console.log(err))
  })
}

const addRole = () => {
  db.query('SELECT roles.title AS Title, roles.salary AS Salary FROM roles', (err, roleInfo) => {
    prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is this role\'s title?'
      },
      {
        type: 'number',
        name: 'salary',
        message: 'What is this role\'s salary?'
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department is this role?',
        choices: pickDepartment()
      }
    ])
    .then(response => {
      let deptID = pickDepartment().indexOf(response.department)+1
      db.query('INSERT INTO roles SET ?', {title: response.title, salary: response.salary, department_id: deptID}, err => {
        if (err) {console.log(err)}
        console.log('Added a new role!')
        contCheck()
      })
    })
    .catch(err => console.log(err))
  })
}

const addDepartment = () => {
  prompt([
    {
      type: 'input',
      name: 'deptName',
      message: 'What department would you like to add?'
    }
  ])
  .then(response => {
    db.query('INSERT INTO departments SET ?', {dept_name: response.deptName}, err => {
      if (err) {console.log(err)}
      console.log('Added new department!')
      contCheck()
    })
  })
}

// MENU FOR THE USER INPUT
const menu = () => {
  prompt ([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View all employees', 'View all employees by department', 'View all employees by manager', 'Add employee', 'Add department', 'Add role', 'Update employee role', 'EXIT']
    }
  ])
  .then (({action}) => {
    switch (action) {
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
      case 'Add department':
        addDepartment()
        break
      case 'Add role':
        addRole()
        break
      case 'Update employee role':
        updateEmployeeRole()
        break
      case 'EXIT':
        process.exit()
    }
  })
  .catch(err => console.error(err))
}

menu()