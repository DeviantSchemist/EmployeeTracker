const express = require('express')
const app = express()
const { join } = require('path')
const { prompt } = require('inquirer')
require('console.table')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes'))

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


app.listen(process.env.PORT || 3000)