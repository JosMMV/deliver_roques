'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubsidiarySchema extends Schema {
  up () {
    this.create('subsidiaries', (table) => {
      table.increments()
      table.string('name', 100).notNullable().unique()
      table.string('state', 100).notNullable()
      table.string('city', 100).notNullable()
      table.string('parish', 100).notNullable()
      table.float('distanceFromCaracas').notNullable()
    })
  }

  down () {
    this.drop('subsidiaries')
  }
}

module.exports = SubsidiarySchema
