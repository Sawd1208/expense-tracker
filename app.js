const express = require('express')
const exphbs = require('express-handlebars')
const moment = require('moment')
const app = express()
const port = 3000

const Record = require('./models/record')

require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  
  Record.find()
    .lean()
    .then(records => {
      for (let i = 0; i < records.length; i++) {
        records[i].date = moment(records[i].date).format('YYYY-MM-DD')
      }
      res.render('index', { records })
    })
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`The App is running on http://localhost:${port}`)
})