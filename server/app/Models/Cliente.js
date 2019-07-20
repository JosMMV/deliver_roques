'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
  ordenDistribucion () {
    return this.hasMany('App/Models/OrdenDistribucion')
  }
}

module.exports = Cliente
