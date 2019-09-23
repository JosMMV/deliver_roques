'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class OrdenDistribucionNoExisteException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: 'Orden no existe',
    })
  }
}

module.exports = OrdenDistribucionNoExisteException
