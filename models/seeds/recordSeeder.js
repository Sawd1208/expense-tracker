const mongoose = require('mongoose')
const Record = require('../record')

if (process.env.NODE_ENV !== 'production') {
  require(dotenv).config()
}

mongoose.connection(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('connected')
})