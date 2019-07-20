'use strict'

const User = use('App/Models/User');

class UserController {
  async registrar({ request }) {
    const { username, password } = request.all();
    const user = await User.create({
      username,
      password,
    });
    return user;
  }
  async iniciar_sesion({ request, auth }) {
    const { username, password } = request.all();
    const token = await auth.attempt(username, password);
    return {token, username};
  }
}

module.exports = UserController
