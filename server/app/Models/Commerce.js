'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Commerce extends Model {
  static get createdAtColumn () {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  orders () {
    return this.hasMany('App/Models/Order')
  }

  bills () {
    return this.hasMany('App/Models/Bill')
  }
}

module.exports = Commerce
