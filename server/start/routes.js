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
  Route.post('/auth/iniciar_sesion', 'AuthController.login')
  Route.post('/auth/registrar', 'AuthController.register')

  Route.get('/productos', 'ProductController.index').middleware(['auth'])
  Route.get('/productos/:id', 'ProductController.show').middleware(['auth'])
  Route.post('/productos', 'ProductController.create').middleware(['auth'])
  Route.patch('/productos/:id', 'ProductController.update').middleware(['auth'])
  Route.delete('/productos/:id', 'ProductController.destroy').middleware(['auth'])

  Route.get('/comercio', 'CommerceController.index').middleware(['auth'])
  Route.get('/comercio/:rif', 'CommerceController.show').middleware(['auth'])
  Route.post('/comercio', 'CommerceController.create').middleware(['auth'])
  Route.patch('/comercio/:rif', 'CommerceController.update').middleware(['auth'])
  Route.delete('/comercio/:rif', 'CommerceController.destroy').middleware(['auth'])

  Route.get('/sucursal', 'SubsidiaryController.index').middleware(['auth'])
  Route.get('/sucursal/:id', 'SubsidiaryController.show').middleware(['auth'])
  Route.post('/sucursal', 'SubsidiaryController.create').middleware(['auth'])
  Route.patch('/sucursal/:id', 'SubsidiaryController.update').middleware(['auth'])
  Route.delete('/sucursal/:id', 'SubsidiaryController.destroy').middleware(['auth'])

  Route.get('/pedido', 'OrderController.index').middleware(['auth'])
  Route.get('/pedido/:id', 'OrderController.show')
  Route.get('/orden/comercio', 'OrderController.showByCommerce').middleware(['auth'])
  Route.get('/pedido/detalle/:id', 'OrderController.showDetailOrder').middleware(['auth'])
  Route.post('/pedido', 'OrderController.create').middleware(['auth'])
  Route.post('/pedido/:id', 'OrderController.confirm').middleware(['auth'])
  Route.patch('/pedido/:id', 'OrderController.update').middleware(['auth'])
  Route.delete('/pedido/:id', 'OrderController.destroy').middleware(['auth'])

  Route.get('/factura', 'BillController.index').middleware(['auth'])
  Route.get('/factura/comercio', 'BillController.showByCommerce').middleware(['auth'])
  Route.get('/factura/prefactura/:id', 'BillController.preBill').middleware(['auth'])
  Route.post('/factura', 'BillController.create').middleware(['auth'])
  Route.patch('/factura/:id', 'BillController.update').middleware(['auth'])
  Route.delete('/factura/:id', 'BillController.destroy').middleware(['auth'])
}).prefix('dist')
