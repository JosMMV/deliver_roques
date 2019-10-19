'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.integer('id').unsigned().primary()
      table.string('name',255).notNullable()
      table.float('price').notNullable()
      table.float('bulk').notNullable()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
