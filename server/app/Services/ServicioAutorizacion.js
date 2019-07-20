const AccesoInvalidoException = use('App/Exceptions/AccesoInvalidoException');
const RecursoNoExisteException = use('App/Exceptions/RecursoNoExisteException');

class ServicioAutorizacion {
  verificarPermiso(resourse) {
    if (!resourse) {
      throw new RecursoNoExisteException();
    }
    /* if (resourse.user_id !== user.id) {
      throw new AccesoInvalidoException();
    }*/
  }
}

module.exports = new ServicioAutorizacion();