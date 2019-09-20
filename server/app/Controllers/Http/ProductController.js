'use strict'

const Product = use('App/Models/Product');
const ServicioValidacion = use('App/Services/ServicioValidacion');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    return await Product.all();
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {Request} ctx.request
   */
  async create ({ request }) {
    const { nombre, precio, volumen } = request.all();
    const product = await Product.create({
      nombre,
      precio,
      volumen,
    });
    return product;
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const product = await Product.find(params.id);
    ServicioValidacion.verificarProducto(product);
    return product;
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const product = await Product.find(params.id);
    ServicioValidacion.verificarProducto(product);
    product.merge(request.only('precio'));
    await product.save();
    return product;
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async destroy ({ params }) {
    const product = await Product.find(params.id);
    ServicioValidacion.verificarProducto(product);
    await product.delete();
    return product;
  }
}

module.exports = ProductController
