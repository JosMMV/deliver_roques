'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  static get createdAtColumn () {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  orders () {
    return this.belongsToMany('App/Models/Order')
  }
}

module.exports = Product
