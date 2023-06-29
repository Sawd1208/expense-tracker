const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then(record => {
      for (let i = 0; i < record.length; i++) {
        record[i].date = moment(record[i].date).format('YYYY-MM-DD')
      }
      res.render('index', { record })
    })
    .catch(err => console.log(err))
})

module.exports = router