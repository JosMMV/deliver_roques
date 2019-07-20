'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccesoInvalidoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(403).json({
      error: 'No tiene acceso al recurso',
    })
  }
}

module.exports = AccesoInvalidoException
