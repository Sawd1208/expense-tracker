const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require(dotenv).config()
}

const seed_Record = require('../record')
const seed_User = require('../user')
const seed_Category = require('../category')

// mongoose.connection(process.env.MONGODB_URI)

const db = mongoose.connection

// db.on('error', () => {
//   console.log('error')
// })
db.once('open', () => {
  
})