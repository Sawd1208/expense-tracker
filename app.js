const express = require('express')
const exphbs = require('express-handlebars')
const moment = require('moment')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000

const Record = require('./models/record')

require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
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

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, amount, category } = req.body
  return Record.create({ name, date, amount})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record })
    })
    .catch(err => console.log(err))
})

app.put('/records/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndUpdate({_id}, {...req.body})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.delete('/records/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`The App is running on http://localhost:${port}`)
})