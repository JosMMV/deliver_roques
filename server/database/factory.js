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
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async faker => {
  return {
    username: faker.email(),
    password: await Hash.make(faker.password()),
    created_at: faker.date()
  }
})

Factory.blueprint('App/Models/Commerce', async faker => {
  return {
    user_id: async () => {
      return (await Factory.model('App/Models/User').create()).id
    },
    rif: faker.ssn({ dashes: false }),
    nombre: faker.company(),
  }
});

Factory.blueprint('App/Models/Product', faker => {
  return {
    nombre: faker.word(),
    precio: faker.floating({min: 15500, max: 1000000 }),
    volumen: faker.floating({min: 10, max: 150 })
  } 
})

Factory.blueprint('App/Models/Subsidiary', faker => {
  return {
    nombre: faker.animal(),
    estado: faker.state(),
    ciudad: faker.city(),
    parroquia: faker.province(),
    distanciaDesdeCaracas: faker.natural({min: 10, max: 800})
  } 
})

Factory.blueprint('App/Models/Client', faker => {
  return {
    cedula: faker.natural({min: 900000, max: 30000000}),
    nombre: faker.first(),
    apellido: faker.last(),
    telefono: faker.phone()
  }
})