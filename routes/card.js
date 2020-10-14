const {Router} = require('express')
const Course = require('../models/course')
const router = Router()
const authMw = require('../middleware/auth')

const mapCartItems = (cart) => {
  return cart.items.map(c => ({
    ...c.courseId._doc,
    id: c.courseId.id,
    count: c.count
  }))
}

const computePrice = (courses) => {
  return courses.reduce((total, course) => {
    return total += course.price * course.count
  }, 0)
}

router.post('/add', authMw, async (req, res) => {
  const course = await Course.findById(req.body.id)
  await req.user.addToCart(course)
  res.redirect('/courses')
})

router.delete('/remove/:id', authMw, async (req, res) => {
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate('cart.items.courseId').execPopulate()

  const courses = mapCartItems(user.cart)
  const cart = {
    courses, price: computePrice(courses)
  }

  res.status(200).json(cart)
})

router.get('/', authMw, async (req, res) => {
  const user = await req.user
    .populate('cart.items.courseId')
    .execPopulate()

  const cartItems = mapCartItems(user.cart)

  res.render('card', {
    title: 'Корзина',
    isCard: true,
    courses: cartItems,
    price: computePrice(cartItems)
  })
})

module.exports = router
