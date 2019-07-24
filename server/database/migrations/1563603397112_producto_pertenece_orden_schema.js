'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoPerteneceOrdenSchema extends Schema {
  up () {
    this.create('productos_pertenece_orden', (table) => {
      table.integer('cantidad').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('productos_pertenece_orden')
  }
}

module.exports = ProductoPerteneceOrdenSchema
