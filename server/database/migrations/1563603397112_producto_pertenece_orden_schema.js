'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoPerteneceOrdenSchema extends Schema {
  up () {
    this.create('productos_pertenece_orden', (table) => {
      table.integer('orden_id').unsigned().references('id').inTable('ordenes_distribucion')
      table.integer('producto_id').unsigned().references('id').inTable('productos')
      table.integer('cantidad').notNullable()
      table.primary(['orden_id', 'producto_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('productos_pertenece_orden')
  }
}

module.exports = ProductoPerteneceOrdenSchema
