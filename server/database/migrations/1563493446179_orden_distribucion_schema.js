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
      table.date('empacado')
      table.date('cargado')
      table.date('camino')
      table.date('sucursal')
      table.timestamps()
    })
  }

  down () {
    this.drop('ordenes_distribucion')
  }
}

module.exports = OrdenDistribucionSchema
