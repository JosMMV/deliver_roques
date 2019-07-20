'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrdenDistribucion extends Model {
  cliente () {
    return this.belongsTo('App/Models/Cliente')
  }
  comercio () {
    return this.belongsTo('App/Models/Comercio')
  }
  factura () {
    return this.belongsTo('App/Models/Factura')
  }
  sucursal () {
    return this.belongsTo('App/Models/Sucursal')
  }
}

module.exports = OrdenDistribucion
