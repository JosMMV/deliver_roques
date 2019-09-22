'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductOrderSchema extends Schema {
  up () {
    this.create('order_product', (table) => {
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('amount').notNullable()
    })
  }

  down () {
    this.drop('order_product')
  }
}

module.exports = ProductOrderSchema
