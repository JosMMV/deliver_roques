'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NoEsAdministradorException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(403).json({
      error: 'No tiene permisos de administrador',
    })
  }
}

module.exports = NoEsAdministradorException
