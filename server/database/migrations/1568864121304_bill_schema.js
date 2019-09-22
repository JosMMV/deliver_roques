'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BillSchema extends Schema {
  up () {
    this.create('bills', (table) => {
      table.increments()
      table.integer('commerce_id').unsigned().references('id').inTable('commerce').onDelete('CASCADE')
      table.float('amount',20,3).notNullable()
      table.date('topDate').notNullable()
      table.date('payingDate')
      table.string('status', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bills')
  }
}

module.exports = BillSchema
