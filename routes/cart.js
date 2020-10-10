const {Router} = require('express')
const Course = require('../models/course')
const Cart = require('../models/Cart')

const router = Router()

router.post('/add', async (req, res) => {

  const course = await Course.getById(req.body.id)
  const cart = new Cart()
  cart.add(course)


  res.redirect('/cart')
})

router.get('/delete', async (req, res) => {
  const id = await req.params.id
  console.log(req.params);
  res.redirect('/cart')
})

router.get('/', async(req, res) => {

  const cart = await Cart.getCart()

  res.render('cart', {
    title: `There are ${cart.length} courses in the Cart`,
    isCart: true,
    cart
  })
})

module.exports = router
