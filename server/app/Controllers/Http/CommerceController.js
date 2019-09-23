'use strict'

const Commerce = use('App/Models/Commerce')
const ValidationService = use('App/Services/ServicioValidacion')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with commerce
 */
class CommerceController {
  async index () {
    return await Commerce.all()
  }

  /**
   * Display a single commerce.
   * GET comercios/:rif
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const commerce = await Commerce.findBy('tir', params.rif)
    ValidationService.verifyCommerce(commerce)
    return commerce
  }

  /**
   * Update commerce details.
   * PUT or PATCH comercios/:rif
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const commerce = await Commerce.findBy('tir', params.rif)
    ValidationService.verifyCommerce(commerce);
    commerce.merge({name: request.only('name').name})
    commerce.save()
    return commerce;
  }

  /**
   * Delete a commerce with rif.
   * DELETE comercios/:rif
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const commerce = await Commerce.find(params.id)
    ValidationService.verifyCommerce(commerce)
    await commerce.delete()
    return commerce
  }
}

module.exports = CommerceController
