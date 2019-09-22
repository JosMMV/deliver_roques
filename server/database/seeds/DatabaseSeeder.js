'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
    const commerceArray = await Factory.model('App/Models/Commerce').createMany(5)

    const productArray = await Factory.model('App/Models/Product').createMany(15)

    const subsidiaryArray = await Factory.model('App/Models/Subsidiary').createMany(24)
  }
}

module.exports = DatabaseSeeder
