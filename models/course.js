const {v4} = require('uuid')
const path = require('path')
const fs = require('fs')

class Course {

  static getAll () {
    return new Promise((res, rej) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'),
      'utf-8',
      (err, content) => {
        if (err) {
          rej(err)
        } else {
          res(JSON.parse(content))
        }
      })
    })
  }

  constructor(title, price, url) {
    this.title = title;
    this.price = price;
    this.url = url;
    this.id = v4();
  }

  async save() {
    const courses = await Course.getAll()
    courses.push(this.toObj())

    return new Promise((res, rej) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            rej(err)
          } else {
            res()
          }
        }
      )
    })

  }

  toObj () {
    return ({
      title: this.title,
      price: this.price,
      url: this.url,
      id: this.id
    })
  }
}

module.exports = Course
