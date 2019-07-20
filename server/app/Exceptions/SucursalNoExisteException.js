'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class SucursalNoExisteException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: 'Sucursal no existe',
    })
  }
}

module.exports = SucursalNoExisteException
