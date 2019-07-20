'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FacturaSchema extends Schema {
  up () {
    this.create('facturas', (table) => {
      table.increments()
      table.string('comercio_rif', 50).notNullable().references('rif').inTable('comercios')
      table.float('monto').notNullable()
      table.date('fechaEmision').notNullable()
      table.date('fechaTope').notNullable()
      table.date('fechaDePago').notNullable()
      table.string('estatus',255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('facturas')
  }
}

module.exports = FacturaSchema
