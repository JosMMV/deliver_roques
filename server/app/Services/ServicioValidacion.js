const AccesoInvalidoException = use('App/Exceptions/AccesoInvalidoException');
const ProductoNoExisteException = use('App/Exceptions/ProductoNoExisteException');
const UsuarioNoExisteException = use('App/Exceptions/UsuarioNoExisteException');
const SucursalNoExisteException = use('App/Exceptions/SucursalNoExisteException');
const ComercioNoExisteException = use('App/Exceptions/ComercioNoExisteException');

class ServicioValidacion {
  verificarProducto(producto) {
    if (!producto) {
      throw new ProductoNoExisteException();
    }
    /* if (userId !== 'admin') {
      throw new AccesoInvalidoException();
    }*/
  }
  verificarUsuario(usuario) {
    if (!usuario) {
      throw new UsuarioNoExisteException();
    }
  }
  verificarSucursal(sucursal) {
    if (sucursal.length === 0 || sucursal === 0) {
      throw new SucursalNoExisteException();
    }
  }
  verificarComercio(comercio) {
    if (!comercio || comercio.length === 0) {
      throw new ComercioNoExisteException();
    }
  }
}

module.exports = new ServicioValidacion();