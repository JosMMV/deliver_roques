'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UsuarioNoExisteException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: 'Usuario no existe',
    })
  }
}

module.exports = UsuarioNoExisteException
