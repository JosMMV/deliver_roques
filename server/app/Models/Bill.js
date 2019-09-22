'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bill extends Model {
  orders () {
    return this.hasMany('App/Models/Order')
  }

  commerce () {
    return this.belongsTo('App/Models/Commerce')
  }
}

module.exports = Bill
