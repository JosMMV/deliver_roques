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
  Route.post('auth/iniciar_sesion', 'AuthController.login')

  Route.get('/productos', 'ProductController.index')
  Route.get('/productos/:id', 'ProductController.show')

  Route.get('/sucursal', 'SubsidiaryController.index')
  Route.get('/sucursal/:id', 'SubsidiaryController.show')

  Route.get('/pedido', 'OrderController.index')
  Route.get('/pedido/:id', 'OrderController.show')
  Route.get('/pedido/tienda/:id', 'OrderController.showByCommerce')
  Route.post('/pedido', 'OrderController.create')
  Route.post('/pedido/:id', 'OrderController.confirm')
}).prefix('api')


Route.group(() => {
  Route.post('/auth/registrar', 'AuthController.register')

  Route.post('/productos', 'ProductController.create')
  Route.patch('/productos/:id', 'ProductController.update')
  Route.delete('/productos/:id', 'ProductController.destroy')

  Route.get('/comercio', 'CommerceController.index')
  Route.get('/comercio/:rif', 'CommerceController.show')
  Route.post('/comercio', 'CommerceController.create')
  Route.patch('/comercio/:rif', 'CommerceController.update')
  Route.delete('/comercio/:rif', 'CommerceController.destroy')

  Route.post('/sucursal', 'SubsidiaryController.create')
  Route.patch('/sucursal/:id', 'SubsidiaryController.update')
  Route.delete('/sucursal/:id', 'SubsidiaryController.destroy')

  Route.patch('/pedido/:id', 'OrderController.update')
  Route.delete('/pedido/:id', 'OrderController.destroy')

  Route.get('/factura', 'BillController.index')
  Route.get('/factura/:id', 'BillController.show')
  Route.post('/factura', 'BillController.create')
  Route.patch('/factura/:id', 'BillController.update')
  Route.delete('/factura/:id', 'BillController.destroy')
}).prefix('admin')
