'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('ci').notNullable().unique()
      table.string('firstName',100)
      table.string('lastName',100)
      table.string('phoneNumber',50)
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
