const router = require('express').Router()
const db = require('../db')

router.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) {console.log(err)}
    res.json(employees)
  })
})

router.post('/employees', (req, res) => {
  db.query('INSERT INTO employees SET ?', req.body, err => {
    if (err) {console.log(err)}
    res.sendStatus(200)
  })
})

router.put('/employees/:id', (req, res) => {
  db.query('UPDATE items SET ? WHERE ?', [req.body, {id: req.params.id}], err => {
    if (err) {console.log(err)}
    res.sendStatus(200)
  })
})

router.delete('/employees/:id', (req, res) => {
  db.query('DELETE FROM employees WHERE ?', {id: req.params.id}, err => {
    if (err) {console.log(err)}
    res.sendStatus(200)
  })
})

module.exports = router