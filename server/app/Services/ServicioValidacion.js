const AccesoInvalidoException = use('App/Exceptions/AccesoInvalidoException')
const ProductoNoExisteException = use('App/Exceptions/ProductoNoExisteException')
const SucursalNoExisteException = use('App/Exceptions/SucursalNoExisteException')
const ComercioNoExisteException = use('App/Exceptions/ComercioNoExisteException')
const OrdenNoExisteException = use('App/Exceptions/OrdenNoExisteException')
const OrdenNoConfirmadaException = use('App/Exceptions/OrdenNoConfirmadaException')
const FacturaNoExisteException = use('App/Exceptions/FacturaNoExisteException')
const NoEsAdministradorException = use('App/Exceptions/NoEsAdministradorException');

class ServicioValidacion {
  verifyProduct(product) {
    if (!product) throw new ProductoNoExisteException()
  }
  verifySubsidiary(subsidiary) {
    if (!subsidiary) throw new SucursalNoExisteException()
  }
  verifyCommerce(commerce) {
    if (!commerce) throw new ComercioNoExisteException()
  }
  verifyOrder(order) {
    if (!order) throw new OrdenNoExisteException()
  }
  verifyConfirmedOrder(order) {
    if (!order.confirmed) throw new OrdenNoConfirmadaException()
  }
  verifyBill(bill) {
    if (!bill) throw new FacturaNoExisteException()
  }
  verifyAccess(commerce, order) {
    if(commerce.id !== order.commerce_id) throw new AccesoInvalidoException()
  }
  verifyAdmin(user) {
    if (user.username.substring(0, 5) !== 'admin') throw new NoEsAdministradorException()
  }
}

module.exports = new ServicioValidacion();