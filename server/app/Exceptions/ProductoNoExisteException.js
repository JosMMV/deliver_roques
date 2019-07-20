'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ProductoNoExisteException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: 'Producto no existe',
    })
  }
}

module.exports = ProductoNoExisteException
