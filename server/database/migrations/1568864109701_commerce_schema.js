'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommerceSchema extends Schema {
  up () {
    this.create('commerce', (table) => {
      table.increments()
      table.string('correo',80).references('username').inTable('users').onDelete('CASCADE')
      table.string('rif', 50).notNullable().unique()
      table.string('nombre', 254).notNullable()
    })
  }

  down () {
    this.drop('commerce')
  }
}

module.exports = CommerceSchema
