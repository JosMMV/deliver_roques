'use strict'

const Subsidiary = use('App/Models/Subsidiary')
const ServicioValidacion = use('App/Services/ServicioValidacion');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with subsidiaries
 */
class SubsidiaryController {
  async index () {
    return await Subsidiary.all();
  }

  /**
   * Render a form to be used for creating a new subsidiary.
   * GET subsidiaries/create
   *
   * @param {Request} ctx.request
   */
  async create ({ request }) {
    const { nombre, estado, ciudad, parroquia, distanciaDesdeCaracas } = request.all();
    const d = new Date();
    const subsidiary = await Database.insert({
      nombre,
      estado,
      ciudad,
      parroquia,
      distanciaDesdeCaracas,
      created_at: d,
      updated_at: d
    }).into('sucursales');
    return subsidiary;
  }

  /**
   * Display a single subsidiary.
   * GET subsidiaries/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const subsidiary = await Subsidiary.find(params.id);
    ServicioValidacion.verificarSucursal(subsidiary);
    return subsidiary;
  }

  /**
   * Update subsidiary details.
   * PUT or PATCH subsidiaries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const subsidiary = await Subsidiary.find(params.id);
    ServicioValidacion.verificarSucursal(subsidiary);
    subsidiary.merge({
      name: request.only('name').name,
      updated_at: new Date()
    });
    await subsidiary.save();
    return subsidiary;
  }

  /**
   * Delete a subsidiary with id.
   * DELETE subsidiaries/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params }) {
    const subsidiary = await Subsidiary.find(params.id);
    ServicioValidacion.verificarSucursal(subsidiary);
    await subsidiary.delete();
    return subsidiary;
  }
}

module.exports = SubsidiaryController
