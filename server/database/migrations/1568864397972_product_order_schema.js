'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductOrderSchema extends Schema {
  up () {
    this.create('product_orders', (table) => {
      table.integer('orden_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table.integer('producto_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('cantidad').notNullable()
    })
  }

  down () {
    this.drop('product_orders')
  }
}

module.exports = ProductOrderSchema
