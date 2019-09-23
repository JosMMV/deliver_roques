'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('tracking_id').notNullable().unique()
      table.float('shippingCost').notNullable()
      table.date('shippingTime').notNullable()
      table.boolean('confirmed').notNullable()
      table.datetime('packed')
      table.datetime('charged')
      table.datetime('way')
      table.datetime('subsidiary')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.integer('commerce_id').unsigned().references('id').inTable('commerce').onDelete('CASCADE')
      table.integer('bill_id').unsigned().references('id').inTable('bills').onDelete('CASCADE')
      table.integer('subsidiary_id').unsigned().references('id').inTable('subsidiaries').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
