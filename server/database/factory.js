'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

Factory.blueprint('App/Models/User', async faker => {
  return {
    username: faker.username(),
    password: await Hash.make(faker.password()),
    created_at: faker.date()
  }
})

Factory.blueprint('App/Models/Product', faker => {
  return {
    nombre: faker.sentence({words: 2}),
    precio: faker.floating({min: 24000, max: 1000000}),
    volumen: faker.floating({min: 3, max: 50 })
  } 
})