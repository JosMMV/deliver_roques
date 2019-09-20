'use strict'

const Commerce = use('App/Models/Commerce');
const ServicioValidacion = use('App/Services/ServicioValidacion');
const User = use('App/Models/User');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with commerce
 */
class CommerceController {
  async index () {
    return await Commerce.all();
  }

  /**
   * Render a form to be used for creating a new comercio.
   * GET comercios/create
   *
   * @param {Request} ctx.request
   */
  async create ({ request }) {
    const { rif, nombre, correo } = request.all();
    const usuario = await User.findBy('username', correo);
    ServicioValidacion.verificarUsuario(usuario);
    const comercio = await Commerce.create({
      rif,
      nombre,
      correo,
    });
    return comercio;
  }

  /**
   * Display a single comercio.
   * GET comercios/:rif
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const comercio = await Commerce.findBy('rif', params.rif);
    ServicioValidacion.verificarComercio(comercio);
    return comercio;
  }

  /**
   * Update comercio details.
   * PUT or PATCH comercios/:rif
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const comercio = await Commerce.query().where('rif', params.rif).update(request.only('nombre')); //0 si hubo error y 1 si se actualizó exitosamente
    ServicioValidacion.verificarComercio(comercio);
    return comercio;
  }

  /**
   * Delete a comercio with rif.
   * DELETE comercios/:rif
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const comercio = await Commerce.query().where('rif', params.rif).delete(); //0 si hubo error y 1 si se eliminó exitosamente
    ServicioValidacion.verificarComercio(comercio);
    return comercio;
  }
}

module.exports = CommerceController
