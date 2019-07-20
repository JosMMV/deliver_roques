'use strict'

const Producto = use('App/Models/Producto');
const ServicioAutorizacion = use('App/Services/ServicioAutorizacion');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with productos
 */
class ProductoController {
  /**
   * Show a list of all productos.
   * GET productos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    return Producto.all();
  }

  /**
   * Create/save a new producto.
   * POST productos
   *
   * @param {Request} ctx.request
   */
  async create ({ request }) {
    const { nombre, precio } = request.all();
    const producto = await Producto.create({
      nombre,
      precio,
    });
    return producto;
  }

  /**
   * Display a single producto.
   * GET productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update producto details.
   * PUT or PATCH productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a producto with id.
   * DELETE productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async destroy ({ params, request }) {
    const producto = await Producto.find(params.id);
    ServicioAutorizacion.verificarPermiso(producto);
    await producto.delete();
    return producto;
  }
}

module.exports = ProductoController
