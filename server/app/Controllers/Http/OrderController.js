'use strict'

const Database = use('Database');
const Order = use('App/Models/Order')
const Client = use('App/Models/Client')
const Subsidiary = use('App/Models/Subsidiary')
const Commerce = use('App/Models/Commerce')
const Product = use('App/Models/Product')
const ValidationService = use('App/Services/ServicioValidacion')
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   */
  async index ({ auth }) {
    const user = await auth.getUser()
    ValidationService.verifyAdmin(user)
    return await Order.query().with('client').with('subsidiary').with('commerce').fetch()
  }

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {Request} ctx.request
   */
  async create ({ request, auth }) {
    const user = await auth.getUser()
    const commerce = await user.commerce().fetch()

    const trx = await Database.beginTransaction()

    try {
      const { client, subsidiaryName, products } = request.all()

      const subsidiary = await Subsidiary.findBy('name', subsidiaryName)
      ValidationService.verifySubsidiary(subsidiary)

      ValidationService.verifyCommerce(commerce)

      let clientA = await Client.findBy('ci', client.ci)
      if (clientA === null) {
        clientA = await Client.create({
          ci: client.ci,
          firstName: client.first,
          lastName: client.last,
          phoneNumber: client.phoneNumber
        }, trx)
      }

      let idProducts = []
      let quantityProducts = []
      products.forEach(product => {
        idProducts.push(product.id)
        quantityProducts.push(product.quantity)
      });
      let productsQuery = await Product.query().whereIn('id', idProducts).fetch()
      productsQuery = productsQuery.toJSON()

      const amount = await this.calculateAmount(productsQuery, products, subsidiary.distanceFromCaracas)

      const deliveryDate = this.calculateDeliveryDate(subsidiary.distanceFromCaracas);

      const order = await Order.create({
        tracking_id: Math.floor(Math.random() * 99999999) + 10000000,
        shippingCost: amount,
        shippingTime: deliveryDate,
        confirmed: false,
        client_id: clientA.id,
        commerce_id: commerce.id,
        subsidiary_id: subsidiary.id
      }, trx)

      let i = 0

      await order.products().attach(idProducts, row => {
        row.amount = quantityProducts[i]
        i++
      }, trx)

      trx.commit()

      return {
        'tracking': order.tracking_id,
        'deliveryDate': deliveryDate,
        'deliveryAmount': amount,
      };
    } catch (error) {
      console.log(error)
      trx.rollback()
      return {
        'error': 'Error al crear orden'
      }
    } 
  }

  async confirm ({ params, auth }) {
    const user = await auth.getUser()
    const commerce = await user.commerce().fetch()
    const order = await Order.findBy('tracking_id', params.id)
    ValidationService.verifyOrder(order)
    ValidationService.verifyAccess(commerce, order)
    order.merge({
      confirmed: true
    })
    order.save()
    return {
      "tracking": order.tracking_id,
      "confirmed": true
    }; 
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const order = await Order.findBy('tracking_id', params.id);
    ValidationService.verifyOrder(order)
    return order;
  }

  /**
   * Display a all the orders of a commerce
   * GET orders/:id
   *
   * @param {object} ctx
   */
  async showByCommerce ({ auth }) {
    const user = await auth.getUser()
    const commerce = await user.commerce().fetch()
    ValidationService.verifyCommerce(commerce)
    await commerce.loadMany({
      orders: order => {
        order.select('*').with('client').with('subsidiary')
      }
    })
    return commerce;
  }

  async showDetailOrder({params, auth }) {
    const user = await auth.getUser()
    const commerce = await user.commerce().fetch()
    const order = await Order.find(params.id)
    ValidationService.verifyAccess(commerce, order)
    ValidationService.verifyOrder(order)
    await order.loadMany({
      products: product => product.select('name', 'price'),
      client: client => client.select('ci'),
      subsidiary: subsidiary => subsidiary.select('name'),
      commerce: commerce => commerce.select('name')
    })
    return order
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request, auth }) {
    const user = await auth.getUser()
    ValidationService.verifyAdmin(user)
    const { tipo } = request.all()
    const order = await Order.findBy('tracking_id', params.id)

    ValidationService.verifyOrder(order)
    ValidationService.verifyConfirmedOrder(order)

    let date = new Date()

    if (tipo === 'packed') order.merge({packed: date})
    else if (tipo === 'charged' && !!order.packed) order.merge({charged: date})
      else if (tipo === 'way' && !!order.charged) order.merge({way: date})
        else if(tipo === 'subsidiary' && !!order.way) order.merge({subsidiary: date})
          else return {'error': 'No se pudo actualizar la fecha'}
    order.save()
    return order
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params, auth }) {
    const user = await auth.getUser()
    ValidationService.verifyAdmin(user)
    return {
      message: 'Nada por ahora. Luego se eliminará ' + params.id,
    }
  }

  async calculateAmount(products, requestProducts, distance) {
    let totalBulk = 0;
    for (let i = 0; i < products.length; i++) {
      totalBulk += products[i].bulk * requestProducts[i].quantity
    }
    return totalBulk * distance * 0.8
  }

  calculateDeliveryDate(distance) {
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date;
    }
    let deliveryDate = new Date()
    if (distance === 458) deliveryDate = deliveryDate.addDays(5)
    else if (distance < 100) deliveryDate = deliveryDate.addDays(1)
      else if (distance < 400) deliveryDate = deliveryDate.addDays(2)
        else deliveryDate = deliveryDate.addDays(3)
    return deliveryDate;
  }
}

module.exports = OrderController
