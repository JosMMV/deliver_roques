'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoSchema extends Schema {
  up () {
    this.create('productos', (table) => {
      table.increments()
      table.string('nombre',255).notNullable()
      table.float('precio',10,2).notNullable()
      table.float('volumen',10,2).notNullable()
      table.timestamps()
    })
  }
}

module.exports = ProductoSchema
