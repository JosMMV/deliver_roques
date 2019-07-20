'use strict'

const Producto = use('App/Models/Producto');
const ServicioValidacion = use('App/Services/ServicioValidacion');

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
    return await Producto.all();
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
  async show ({ params }) {
    const producto = await Producto.find(params.id);
    ServicioValidacion.verificarPermiso(producto);
    return producto;
  }

  /**
   * Update producto details.
   * PUT or PATCH productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const producto = await Producto.find(params.id);
    producto.merge(request.only('precio'));
    await producto.save();
    return producto;
  }

  /**
   * Delete a producto with id.
   * DELETE productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async destroy ({ params }) {
    const producto = await Producto.find(params.id);
    ServicioValidacion.verificarPermiso(producto);
    await producto.delete();
    return producto;
  }
}

module.exports = ProductoController
