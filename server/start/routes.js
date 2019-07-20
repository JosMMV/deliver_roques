'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('auth/iniciar_sesion', 'UserController.iniciar_sesion')
}).prefix('api')


Route.group(() => {
  Route.post('/auth/registrar', 'UserController.registrar')
  
  Route.get('/productos', 'ProductoController.index')
  Route.get('/productos/:id', 'ProductoController.show')
  Route.post('/productos', 'ProductoController.create')
  Route.patch('/productos/:id', 'ProductoController.update')
  Route.delete('/productos/:id', 'ProductoController.destroy')
  
  Route.get('/comercio', 'ComercioController.index')
  Route.get('/comercio/:rif', 'ComercioController.show')
  Route.post('/comercio', 'ComercioController.create')
  Route.patch('/comercio/:rif', 'ComercioController.update')
  Route.delete('/comercio/:rif', 'ComercioController.destroy')
}).prefix('admin')
