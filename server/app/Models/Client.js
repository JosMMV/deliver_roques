'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
  static get createdAtColumn () {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  orders () {
    return this.hasMany('App/Models/Order')
  }
}

module.exports = Client
