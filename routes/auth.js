const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/', async(req, res) => {

  res.render('auth/login', {
    isLogin: true,
    title: 'Login'
  })
})

router.get('/logout', async(req, res) => {
  req.session.destroy(() => res.redirect('/auth#login'))
})

router.post('/login', async(req, res) => {
  req.session.isAuth = true
  const user = await User.findById('5f84c04c194f3c5cccaee080')
  req.session.user = user

  req.session.save((error) => {
    if (error) {
      console.log(error);
    }
    res.redirect('/')
  })
})

router.post('/register', async(req, res) => {

  router.redirect('/')
})


module.exports = router
