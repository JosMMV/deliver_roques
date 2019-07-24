'use strict'

const Factura = use('App/Models/Factura');
const ServicioValidacion = use('App/Services/ServicioValidacion');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with facturas
 */
class FacturaController {
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
    return await Factura.all();
  }

  /**
   * Render a form to be used for creating a new factura.
   * GET facturas/create
   *
   * @param {Request} ctx.request
   */
  async create ({ request }) {
    const { monto, fechaEmision, fechaTope, comercio_rif } = request.all();
    const factura = await Factura.create({
      monto,
      fechaEmision,
      fechaTope,
      comercio_rif,
    });
    return factura;
  }

  /**
   * Display a single factura.
   * GET facturas/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const factura = await Factura.find(params.id);
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
  async update ({ params, request }) {
    const factura = await Factura.find(params.id);
    ServicioValidacion.verificarFactura(factura);
    //factura.merge(request.only('precio'));
    await factura.save();
    return factura;
  }

  /**
   * Delete a factura with id.
   * DELETE facturas/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params }) {
    const factura = await Factura.find(params.id);
    ServicioValidacion.verificarFactura(factura);
    await factura.delete();
    return factura;
  }
}

module.exports = FacturaController
