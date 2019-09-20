'use strict'

const Database = use('Database')
const ServicioValidacion = use('App/Services/ServicioValidacion');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with subsidiaries
 */
class SubsidiaryController {
  async index () {
    return await Database.select('*').from('sucursales');
  }

  /**
   * Render a form to be used for creating a new sucursal.
   * GET sucursals/create
   *
   * @param {Request} ctx.request
   */
  async create ({ request }) {
    const { nombre, estado, ciudad, parroquia, distanciaDesdeCaracas } = request.all();
    const d = new Date();
    const sucursal = await Database.insert({
      nombre,
      estado,
      ciudad,
      parroquia,
      distanciaDesdeCaracas,
      created_at: d,
      updated_at: d
    }).into('sucursales');
    return sucursal;
  }

  /**
   * Display a single sucursal.
   * GET sucursals/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const sucursal = await Database.from('sucursales').where('id', params.id);
    ServicioValidacion.verificarSucursal(sucursal);
    return sucursal[0];
  }

  /**
   * Update sucursal details.
   * PUT or PATCH sucursals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const sucursal = await Database.table('sucursales').where('id', params.id).update({
      nombre: request.only('nombre').nombre,
      updated_at: new Date()
    });
    ServicioValidacion.verificarSucursal(sucursal);
    return sucursal;
  }

  /**
   * Delete a sucursal with id.
   * DELETE sucursals/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params }) {
    const sucursal = await Database.table('sucursales').where('id', params.id).delete();
    ServicioValidacion.verificarSucursal(sucursal);
    return sucursal;
  }
}

module.exports = SubsidiaryController
