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

  Route.get('/productos', 'ProductoController.index')
  Route.get('/productos/:id', 'ProductoController.show')

  Route.get('/sucursal', 'SucursalController.index')
  Route.get('/sucursal/:id', 'SucursalController.show')

  Route.get('/pedido', 'OrdenDistribucionController.index')
  Route.get('/pedido/:id', 'OrdenDistribucionController.show')
  Route.get('/pedido/tienda/:rif', 'OrdenDistribucionController.showByShop')
  Route.post('/pedido', 'OrdenDistribucionController.create')
  Route.post('/pedido/:id', 'OrdenDistribucionController.confirm')
}).prefix('api')


Route.group(() => {
  Route.post('/auth/registrar', 'UserController.registrar')

  Route.post('/productos', 'ProductoController.create')
  Route.patch('/productos/:id', 'ProductoController.update')
  Route.delete('/productos/:id', 'ProductoController.destroy')

  Route.get('/comercio', 'ComercioController.index')
  Route.get('/comercio/:rif', 'ComercioController.show')
  Route.post('/comercio', 'ComercioController.create')
  Route.patch('/comercio/:rif', 'ComercioController.update')
  Route.delete('/comercio/:rif', 'ComercioController.destroy')

  Route.post('/sucursal', 'SucursalController.create')
  Route.patch('/sucursal/:id', 'SucursalController.update')
  Route.delete('/sucursal/:id', 'SucursalController.destroy')
  
  Route.patch('/pedido/:id', 'OrdenDistribucionController.update')
  Route.delete('/pedido/:id', 'OrdenDistribucionController.destroy')

  Route.get('/factura', 'FacturaController.index')
  Route.get('/factura/:id', 'FacturaController.show')
  Route.post('/factura', 'FacturaController.create')
  Route.patch('/factura/:id', 'FacturaController.update')
  Route.delete('/factura/:id', 'FacturaController.destroy')
}).prefix('admin')
