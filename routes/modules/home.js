const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  Category.find()
    .lean()
    .then((categories => {
      Record.find({ userId })
        .populate('categoryId')
        .lean()
        .sort({ date: 'asc' })
        .then(record => {
          for (let i = 0; i < record.length; i++) {
            record[i].date = moment(record[i].date).format('YYYY-MM-DD')
            totalAmount += record[i].amount
          }
          return res.render('index', { record, categories, totalAmount })
        })
        .catch(err => console.log(err))
    }))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.category
  let totalAmount = 0

  if (!categoryId) {
    return res.redirect('/')
  }

  Category.find()
    .lean()
    .then(categories => {
      categories.forEach(data => {
        if (String(data._id) === categoryId) {
          data.selected = true
        } else { 
          data.selected = false 
        }
      })
      Record.find({ userId, categoryId })
        .populate('categoryId')
        .lean()
        .sort({ date: 'asc' })
        .then(record => {
          for(let i = 0; i < record.length; i++) {
            record[i].date = moment(record[i].date).format('YYYY-MM-DD')
            totalAmount += record[i].amount
          }
          return res.render('index', { record, categories, totalAmount })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})



module.exports = router