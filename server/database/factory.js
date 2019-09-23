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
const statuses = ['Pagado', 'Pendiente']

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
    tir: faker.ssn({ dashes: false }),
    name: faker.company(),
  }
});

Factory.blueprint('App/Models/Product', faker => {
  return {
    name: faker.word(),
    price: faker.floating({min: 15500, max: 1000000 }),
    bulk: faker.floating({min: 10, max: 150 })
  } 
})

Factory.blueprint('App/Models/Subsidiary', faker => {
  return {
    name: faker.sentence({ words: 2 }),
    state: faker.state(),
    city: faker.city(),
    parish: faker.province(),
    distanceFromCaracas: faker.natural({min: 10, max: 800})
  } 
})

Factory.blueprint('App/Models/Client', faker => {
  return {
    ci: faker.natural({min: 900000, max: 30000000}),
    firstName: faker.first(),
    lastName: faker.last(),
    phoneNumber: faker.phone()
  }
})

Factory.blueprint('App/Models/Order', (faker, i, data) => {
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  let d = new Date()
  return {
    tracking_id: parseInt(d.getTime().toString().substr(4)),
    client_id: data.client_id,
    commerce_id: data.commerce_id,
    bill_id: data.bill_id,
    subsidiary_id: data.subsidiary_id,
    confirmed: false,
    shippingTime: d.addDays(10),
    shippingCost: data.shippingCost
  }
})

Factory.blueprint('App/Models/Bill', (faker, i, data) => {
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  let d = new Date()
  let payingDate = null
  let status = statuses[faker.natural({min: 0, max: 1})]
  if (status === 'Pagado') payingDate = faker.date()
  return {
    commerce_id: data.commerce_id,
    amount: data.amount,
    topDate: d.addDays(15),
    payingDate: payingDate,
    status: status,
    created_at: d
  }
})