'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class FacturaNoExisteException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: 'Factura no existe',
    })
  }
}

module.exports = FacturaNoExisteException
