'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ForeignKeysSchema extends Schema {
  up () {
    this.alter('facturas', (table) => {
      table.string('comercio_rif', 50).references('rif').inTable('comercios')
    })
    this.alter('comercios', (table) => {
      table.string('correo',80).references('username').inTable('users')
    })
    this.alter('ordenes_distribucion', (table) => {
      table.integer('cedula_cliente').references('cedula').inTable('clientes')
      table.string('comercio_rif', 50).references('rif').inTable('comercios')
      table.integer('factura_id').unsigned().references('id').inTable('facturas')
      table.integer('sucursal_id').unsigned().references('id').inTable('sucursales')
    })
    this.alter('productos_pertenece_orden', (table) => {
      table.integer('orden_id').unsigned().references('id').inTable('ordenes_distribucion')
      table.integer('producto_id').unsigned().references('id').inTable('productos')
      table.primary(['orden_id', 'producto_id'])
    })
  }
}

module.exports = ForeignKeysSchema
