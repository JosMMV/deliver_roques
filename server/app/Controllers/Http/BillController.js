'use strict'

const Bill = use('App/Models/Bill')
const Order = use('App/Models/Order')
const Commerce = use('App/Models/Commerce')

const Database = use('Database')
const ValidationService = use('App/Services/ServicioValidacion');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bills
 */
class BillController {
  /**
   * Show a list of all bills.
   * GET bills
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    return await Bill.all();
  }

  /**
   * Render a form to be used for creating a new bill.
   * GET bills/create
   *
   * @param {Request} ctx.request
   */
  async create ({ request }) {
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date;
    }
    const { commerce_tir } = request.all()
    const commerce = await Commerce.findBy('tir', commerce_tir)

    if (!commerce) return {'error': 'No existe comercio con ese RIF'}

    let d = new Date()

    const trx = await Database.beginTransaction()

    try {
      let amount = await Database.raw('SELECT SUM(shippingCost) AS amount FROM orders WHERE bill_id IS null AND subsidiary IS NOT null AND commerce_id = ?', commerce.id)

      amount = amount[0][0].amount

      if (!amount){
        trx.rollback()
        return {'error': 'No hay ordenes entregadas sin factura'}
      }

      const bill = await Bill.create({
        commerce_id: commerce.id,
        amount: amount,
        topDate: d.addDays(15),
        payingDate: null,
        status: 'Pendiente'
      }, trx);

      const affectedRows = await trx.table('orders')
        .where('commerce_id', commerce.id)
        .andWhere('bill_id', null)
        .andWhere('subsidiary', 'is not', null)
        .update('bill_id', bill.id)

      affectedRows === 0 ? trx.rollback() : trx.commit()

      const orders = await Order.query()
        .where('commerce_id', commerce.id)
        .andWhere('bill_id', bill.id)
        .fetch()

      return {
        'orders': orders,
        'bill': bill
      }
    } catch (error) {
      trx.rollback()
      return {'error': 'No se pudo crear factura', 'message': error}
    }
  }

  /**
   * Display a single bill.
   * GET bills/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const bill = await Bill.find(params.id)
    ValidationService.verifyBill(bill)
    return bill
  }

  /**
   * Display a all the bills of a commerce
   * GET bills/:id
   *
   * @param {object} ctx
   */
  async showByCommerce ({ params }) {
    const commerce = await Commerce.find(params.id)
    ValidationService.verifyCommerce(commerce)
    await commerce.load('bills')
    return commerce;
  }

  /**
   * Display some orders of a commerce
   * GET factura/prefactura/:id
   *
   * @param {object} ctx
   */
  async preBill ({ params }) {
    const commerce = await Commerce.findBy('tir',params.id)
    ValidationService.verifyCommerce(commerce)
    await commerce.loadMany({
      orders: order => order.where('bill_id', null)
      .andWhere('subsidiary', 'is not', null)
    })
    if (commerce.getRelated('orders').size() === 0) return {'error': 'No hay ordenes entregadas sin factura'}

    return commerce
  }

  /**
   * Update bill details.
   * PUT or PATCH bills/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params }) {
    const bill = await Bill.find(params.id)
    ValidationService.verifyBill(bill)
    bill.merge({
      status: 'Pagado',
      payingDate: new Date()
    })
    await bill.save()
    return bill
  }

  /**
   * Delete a bill with id.
   * DELETE bills/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params }) {
    const bill = await Bill.find(params.id)
    ValidationService.verifyBill(bill)
    await bill.delete()
    return bill
  }
}

module.exports = BillController
