if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const seed_Category = require('../seedData/categoryList.json')
const Category = require('../category')

const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all(seed_Category.map(seedCategory => {
    return Category.create({ 
      name: seedCategory.name,
      icon: seedCategory.icon
    })
  }))
  .then(() => {
    console.log('seedCategory done')
    process.exit()
  })
})
