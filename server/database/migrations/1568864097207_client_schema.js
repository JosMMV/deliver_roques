'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('cedula').notNullable().unique()
      table.string('nombre',100)
      table.string('apellido',100)
      table.string('telefono',50)
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
