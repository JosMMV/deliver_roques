'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Subsidiary = use('App/Models/Subsidiary')
const Product = use('App/Models/Product')
const subsidiaries = require('./subsidiaries.json')
const productsCommerce2 = require('./products2.json')

class DatabaseSeeder {
  async run () {
    // const commerceArray = await Factory.model('App/Models/Commerce').createMany(5)

    /*const productArray = */await Product.createMany(productsCommerce2)

    /*const subsidiaryArray = */await Subsidiary.createMany(subsidiaries)

    /* const clientArray = await Factory.model('App/Models/Client').createMany(12)

    const orderArray = []

    // create 50 orders
    for (let i = 0; i < 50; i++) {
      let subsidiary = Math.floor(Math.random() * subsidiaryArray.length)
      const amountProducts = Math.floor(Math.random() * 14) + 1
      const products = []
      var totalBulk = 0
      // console.log('-----------------------------------------')

      // create list of products
      for (let j = 0; j < amountProducts; j++) {
        let product = productArray[Math.floor(Math.random() * productArray.length)]
        // console.log('Bulk de: ' + product.id + ' es ' + product.bulk)
        totalBulk += product.bulk
        // console.log('Voy a insertar: ' + product.id)
        products.push(product.id)
      }

      const commerce = commerceArray[Math.floor(Math.random() * commerceArray.length)]

      // console.log('distanceFromCaracas: ' + subsidiaryArray[subsidiary].distanceFromCaracas)
      // console.log('totalBulk: ' + totalBulk)

      // let sC = (subsidiaryArray[subsidiary].distanceFromCaracas * 0.5) * totalBulk
      // console.log(sC)

      const order = await Factory.model('App/Models/Order').create({
        client_id: clientArray[Math.floor(Math.random() * clientArray.length)].id,
        commerce_id: commerce.id,
        bill_id: null,
        subsidiary_id: subsidiaryArray[subsidiary].id,
        shippingCost: (subsidiaryArray[subsidiary].distanceFromCaracas * 20) * totalBulk
      })

      await order.products().attach(products, row => {
        row.amount = Math.floor(Math.random() * 100) + 1
      })

      orderArray.push(order)
    }

    /*for (let i = 1; i <= 5; i++) {
      let amount = 0
      orderArray.forEach(order => {
        if (order.commerce_id === i) {
          amount += order.shippingCost
        }
      });
      await Factory.model('App/Models/Bill').create({
        commerce_id: i,
        amount: amount
      })
    }*/
  }
}

module.exports = DatabaseSeeder
