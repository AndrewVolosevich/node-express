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
  try {
    const {email, password} = req.body

    const candidate = await User.findOne({email})
    if (candidate) {
      const areSame = password === candidate.password

      if (areSame) {
        req.session.user = candidate
        req.session.isAuth = true

        req.session.save((error) => {
          if (error) {
            console.log(error);
          }
          res.redirect('/')
        })
      } else {
        res.redirect('/auth#login')
      }
    } else {
      res.redirect('/auth#login')
    }

  } catch (error) {
    console.log(error);
  }
})

router.post('/register', async(req, res) => {
  try {
    const {email, password, confirm, name} = req.body
    const candidate = await User.findOne({email})

    if (candidate) {
      res.redirect('/auth#register')
    } else {
      const user = new User({
        email, name, password, cart: {items: []}
      })
      await user.save()
      res.redirect('/auth#login')
    }
  } catch (error) {
    console.log(error);
  }
})


module.exports = router
