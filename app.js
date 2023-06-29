const express = require('express')
const exphbs = require('express-handlebars')
const moment = require('moment')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000

const routes = require('./routes')
const Record = require('./models/record')

require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)



app.listen(port, () => {
  console.log(`The App is running on http://localhost:${port}`)
})