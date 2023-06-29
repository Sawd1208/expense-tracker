const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, date, amount, category } = req.body
  return Record.create({ name, date, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndUpdate({ _id }, { ...req.body })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router