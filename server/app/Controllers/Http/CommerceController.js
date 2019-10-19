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
  async index ({ auth }) {
    const user = await auth.getUser()
    ValidationService.verifyAdmin(user)
    return await Commerce.all()
  }

  /**
   * Display a single commerce.
   * GET comercios/:rif
   *
   * @param {object} ctx
   */
  async show ({ params, auth }) {
    const user = await auth.getUser()
    ValidationService.verifyAdmin(user)
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
  async update ({ params, request, auth }) {
    const user = await auth.getUser()
    ValidationService.verifyAdmin(user)
    const commerce = await Commerce.findBy('tir', params.rif)
    ValidationService.verifyCommerce(commerce);
    commerce.merge({
      name: request.only('name').name,
      tir: request.only('tir').tir
    })
    await commerce.save()
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
  async destroy ({ params, auth }) {
    const user = await auth.getUser()
    ValidationService.verifyAdmin(user)
    const commerce = await Commerce.find(params.id)
    ValidationService.verifyCommerce(commerce)
    await commerce.delete()
    return commerce
  }
}

module.exports = CommerceController
