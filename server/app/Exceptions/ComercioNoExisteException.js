'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ComercioNoExisteException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: 'Comercio no existe',
    })
  }
}

module.exports = ComercioNoExisteException
