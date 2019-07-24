'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdenDistribucionSchema extends Schema {
  up () {
    this.create('ordenes_distribucion', (table) => {
      table.increments()
      table.float('costoEnvio').notNullable()
      table.date('tiempoEnvio').notNullable()
      table.boolean('confirmada').notNullable()
      table.datetime('empacado')
      table.datetime('cargado')
      table.datetime('camino')
      table.datetime('sucursal')
      table.timestamps()
    })
  }
}

module.exports = OrdenDistribucionSchema
