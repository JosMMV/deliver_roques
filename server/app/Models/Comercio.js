'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comercio extends Model {
  ordenDistribucion () {
    return this.hasMany('App/Models/OrdenDistribucion')
  }
  user () {
    return this.hasOne('App/Models/User')
  }
}

module.exports = Comercio
