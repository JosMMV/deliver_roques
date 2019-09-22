'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommerceSchema extends Schema {
  up () {
    this.create('commerce', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('tir', 50).notNullable().unique()
      table.string('name', 254).notNullable()
    })
  }

  down () {
    this.drop('commerce')
  }
}

module.exports = CommerceSchema
