'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  products () {
    return this.belongsToMany('App/Models/Product').withPivot(['amount'])
  }

  bill () {
    return this.belongsTo('App/Models/Bill')
  }

  subsidiary () {
    return this.belongsTo('App/Models/Subsidiary')
  }

  commerce () {
    return this.belongsTo('App/Models/Commerce')
  }

  client () {
    return this.belongsTo('App/Models/Client')
  }
}

module.exports = Order
