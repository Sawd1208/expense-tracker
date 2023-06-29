const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

const seed_Record = require('../record')
// const seed_User = require('../user')
// const seed_Category = require('../category')
// const categoryList = require('./categoryList.json')
const recordList = require('./recordList.json')
// const userList = require('./userList.json')



db.once('open', () => {
  console.log('mongodb connected!')
  recordList.map((recordList) => {
    seed_Record.create({
      name: recordList.name,
      date: recordList.date,
      amount: recordList.amount
    })
  })
  console.log('recordSeeder done')
})

