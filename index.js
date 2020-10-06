const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 5555

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'hbs')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port = ${PORT}`);
})
