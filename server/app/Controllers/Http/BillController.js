'use strict'

const Bill = use('App/Models/Bill')
const Order = use('App/Models/Order')

const Database = use('Database')
const ServicioValidacion = use('App/Services/ServicioValidacion');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with facturas
 */
class BillController {
  /**
   * Show a list of all facturas.
   * GET facturas
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
   * Render a form to be used for creating a new factura.
   * GET facturas/create
   *
   * @param {Request} ctx.request
   */
  async create ({ request, response }) {
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
    const { commerce_id } = request.all();
    let d = new Date()

    const trx = await Database.beginTransaction()

    let amount = await Database.raw('SELECT SUM(shippingCost) AS amount FROM orders WHERE bill_id IS null AND commerce_id = ?', commerce_id)

    amount = amount[0][0].amount
    const bill = await Bill.create({
      commerce_id: commerce_id,
      amount: amount,
      topDate: d.addDays(15),
      payingDate: null,
      status: 'Pendiente',
      created_at: d
    }, trx);

    const affectedRows = await trx.table('orders')
      .where('commerce_id', commerce_id)
      .andWhere('bill_id', null)
      .andWhere('confirmed', true)
      .andWhere('subsidiary', '!=', null)
      .update('bill_id', bill.id)

    affectedRows === 0 ? trx.rollback() : trx.commit()

    return await Order.query()
      .where('commerce_id', commerce_id)
      .andWhere('bill_id', bill.id)
      .fetch()
  }

  /**
   * Display a single factura.
   * GET facturas/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const factura = await Bill.find(params.id);
    ServicioValidacion.verificarFactura(factura);
    return factura;
  }

  /**
   * Update factura details.
   * PUT or PATCH facturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params }) {
    const bill = await Bill.find(params.id)
    bill.merge({
      status: 'Pagado',
      payingDate: new Date()
    })
    await bill.save()
    return bill
  }

  /**
   * Delete a factura with id.
   * DELETE facturas/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params }) {
    const bill = await Bill.find(params.id);
    await bill.delete();
    return bill;
  }
}

module.exports = BillController
