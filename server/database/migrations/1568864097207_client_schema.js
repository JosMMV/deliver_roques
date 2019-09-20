'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('cedula').notNullable().unique()
      table.string('nombre',255)
      table.string('apellido',255)
      table.string('telefono',255)
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
