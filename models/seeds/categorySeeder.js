// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

// mongoose.connect(process.env.MONGODB_URI)

const categoryList = require('./categoryList.json')
const seed_Category = require('../category')

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  categoryList.map((categoryList) => {
    seed_Category.create({
      name: categoryList.name,
      icon: categoryList.icon
    })
  })
  console.log('categorySeeder done')
})
