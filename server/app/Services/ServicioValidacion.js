const AccesoInvalidoException = use('App/Exceptions/AccesoInvalidoException');
const RecursoNoExisteException = use('App/Exceptions/RecursoNoExisteException');
const UsuarioNoExisteException = use('App/Exceptions/UsuarioNoExisteException');

class ServicioValidacion {
  verificarPermiso(resourse) {
    if (!resourse) {
      throw new RecursoNoExisteException();
    }
    /* if (resourse.user_id !== user.id) {
      throw new AccesoInvalidoException();
    }*/
  }
  verificarUsuario(usuario) {
    if (!usuario) {
      throw new UsuarioNoExisteException();
    }
  }
}

module.exports = new ServicioValidacion();