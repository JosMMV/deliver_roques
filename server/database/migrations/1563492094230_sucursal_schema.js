'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SucursalSchema extends Schema {
  up () {
    this.create('sucursales', (table) => {
      table.increments()
      table.string('nombre', 254).notNullable().unique()
      table.string('estado', 254).notNullable()
      table.string('ciudad', 254).notNullable()
      table.string('parroquia', 254).notNullable()
      table.integer('distanciaDesdeCaracas').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sucursales')
  }
}

module.exports = SucursalSchema
