const path = require('path')
const fs = require('fs')

class Cart {

  static getCart () {
    return new Promise((res, rej) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'cart.json'),
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

  setCart = async() => {
    this.cart = await Cart.getCart()
  }

  constructor () {
    this.cart = null
    this.setCart()
  }

  async add(course) {
    const cart = await Cart.getCart()
    const isExist = cart.findIndex((c) => c.id === course.id)
    if (isExist === -1) {
      cart.push(course)

    return new Promise((res, rej) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'cart.json'),
        JSON.stringify(cart),
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
    }
}

module.exports = Cart
