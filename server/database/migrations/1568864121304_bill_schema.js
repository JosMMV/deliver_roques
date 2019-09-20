'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BillSchema extends Schema {
  up () {
    this.create('bills', (table) => {
      table.increments()
      table.integer('comercio_id').unsigned().references('id').inTable('commerce').onDelete('CASCADE')
      table.float('monto',20,3).notNullable()
      table.date('fechaEmision').notNullable()
      table.date('fechaTope').notNullable()
      table.date('fechaDePago')
      table.string('estatus', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bills')
  }
}

module.exports = BillSchema
