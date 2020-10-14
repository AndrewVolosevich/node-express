const express = require('express')
const path = require('path')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const orderRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const mongoose = require('mongoose')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const User = require('./models/user')


const app = express()

app.engine('hbs', exphbs({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  extname: 'hbs'
}))



app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async(req, res, next) => {
  try {
    const user = await User.findById('5f84c04c194f3c5cccaee080')
    req.user = user
    next()
  } catch (error) {
    console.log(error);
  }
})
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', orderRoutes)

const PORT = process.env.PORT || 5000
const mongoUrl = 'mongodb+srv://Mongo-express:THNJnBYm4TjGbf46@cluster0.wyzo2.mongodb.net/mongo-express?retryWrites=true&w=majority'

const start = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    const candidate = await User.findOne()
    if(!candidate) {
      const user = new User({
        email:  'test@gmail.com',
        name: 'test',
        cart: {items: []}
      })
      await user.save()
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

  } catch (error) {
    console.log(error);
  }
}

start()
