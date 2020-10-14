const {Router} = require('express')
const Course = require('../models/course')
const router = Router()
const authMw = require('../middleware/auth')

router.get('/', authMw, (req, res) => {
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  })
})

router.post('/', authMw, async (req, res) => {
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    courseUrl: req.body.courseUrl,
    userId: req.user
  })

try {
  await course.save()
  res.redirect('/courses')
} catch (error) {
  console.log(error);
}
})

module.exports = router
