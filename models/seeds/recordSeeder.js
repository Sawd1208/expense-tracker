const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const seed_Record = require('../seedData/recordList.json')
const User = require('../user')
const seed_User = require('../seedData/userList.json')
const Category = require('../category')

const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all(
    seed_User.map((seedUser, index) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          console.log('seedUser created!')
          const userRecord = []
          const userId = user._id
          const record = seedUser.item.map(index => {
          seed_Record[index].userId = userId
          return seed_Record[index]
          })
          return Promise.all(
            record.map(record => {
              return Category.findOne({ name: record.category })
                .lean()
                .then((category) => {
                  record.categoryId = category._id
                  userRecord.push(record)  
                })
            })
          ).then(() => {
            return Record.create(userRecord)
          })
        })
    })
  ).then(() => {
    console.log('done')
    process.exit()
  }).catch(err => console.log(err))
})

