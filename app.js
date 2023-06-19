const express = require('express')
const app = express()

require('./config/mongoose')


app.get('/', (req, res) => {
  res.send('hello, Chloe、Jayden and Zoey !')
})

app.listen(3000, () => {
  console.log('The App is running on http://localhost:3000')
})