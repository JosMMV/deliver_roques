'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.float('costoEnvio').notNullable()
      table.date('tiempoEnvio').notNullable()
      table.boolean('confirmada').notNullable()
      table.datetime('empacado')
      table.datetime('cargado')
      table.datetime('camino')
      table.datetime('sucursal')
      table.integer('id_cliente').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.integer('id_comercio').unsigned().references('id').inTable('commerce').onDelete('CASCADE')
      table.integer('id_factura').unsigned().references('id').inTable('bills').onDelete('CASCADE')
      table.integer('id_sucursal').unsigned().references('id').inTable('subsidiaries').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
