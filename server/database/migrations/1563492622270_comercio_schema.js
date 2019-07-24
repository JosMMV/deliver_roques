'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComercioSchema extends Schema {
  up () {
    this.create('comercios', (table) => {
      table.string('rif', 50).notNullable().unique().primary()
      table.string('nombre', 254).notNullable()
      table.timestamps()
    })
  }
}

module.exports = ComercioSchema
