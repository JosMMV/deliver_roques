'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('ordenes_distribucion')
    this.drop('productos')
    this.drop('sucursales')
    this.drop('clientes')
    this.drop('facturas')
    this.drop('comercios')
    this.drop('users')
  }
}

module.exports = UserSchema
