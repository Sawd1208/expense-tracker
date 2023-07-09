const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((categories) => {
      return res.render('new', { categories })
    })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  const errors = []
  Category.find()
    .lean()
    .then((categories) => {
      categories.forEach((data) => {
        if (category === String(data._id)) {
          data.selected = true
        } else { 
          data.selected = false 
        }
      })

      if (!name || !date || !amount || !category) {
        errors.push({ message: '所有位都是必填的'})
      }

      if (errors.length) {
        return res.render('new', {
          errors,
          name,
          date,
          amount,
          categories
        })
      }

      return Record.create({
        name,
        date,
        amount,
        categoryId: category,
        userId
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Category.find()
    .lean()
    .then(categories => {
      return Record.findById({ _id, userId })
        .lean()
        .then((record) => {
          categories.forEach(category => {
            if (String(category._id) === String(record.categoryId)) {
              category.selected = true
            } else { 
              category.selected = false
            }
          })
          record.date = moment(record.date).format('YYYY-MM-DD')
          return res.render('edit', { record, categories })
        })
        .catch(err => console.log(err))
    })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, category } = req.body
  const errors = []
  
  Category.find()
    .lean()
    .then(categories => {
      categories.forEach(data => {
        if (String(data._id) === category) {
          data.selected = true
        } else { data.selected = false }
      })

      if (!name || !date || !amount || !category) {
        errors.push({ message: '所有欄位都是必填！' })
      }
      if (errors.length) {
        return Record.findById({ _id, userId })
          .lean()
          .then(record => {
            console.log(record)
            record.date = moment(record.date).format('YYYY-MM-DD')
            res.render('edit', {
              errors,
              record,
              categories
            })
          })
      }

      return Record.findByIdAndUpdate({_id, userId}, {
        name,
        date,
        amount,
        userId,
        categoryId: category
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router