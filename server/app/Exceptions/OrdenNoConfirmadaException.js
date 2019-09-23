'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class OrdenNoConfirmadaException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: 'Orden no ha sido confirmada',
    })
  }
}

module.exports = OrdenNoConfirmadaException
