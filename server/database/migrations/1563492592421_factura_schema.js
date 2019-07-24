'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FacturaSchema extends Schema {
  up () {
    this.create('facturas', (table) => {
      table.increments()
      table.float('monto',20,3).notNullable()
      table.date('fechaEmision').notNullable()
      table.date('fechaTope').notNullable()
      table.date('fechaDePago')
      table.string('estatus', 255).notNullable()
      table.timestamps()
    })
  }
}

module.exports = FacturaSchema
