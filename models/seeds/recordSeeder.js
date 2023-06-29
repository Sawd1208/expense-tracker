// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

// mongoose.connect(process.env.MONGODB_URI)

const seed_Record = require('../record')
const recordList = require('./recordList.json')
// const seed_User = require('../user')
// const userList = require('./userList.json')
// const seed_Category = require('../category')
// const categoryList = require('./categoryList.json')


const db = require('../../config/mongoose')

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

