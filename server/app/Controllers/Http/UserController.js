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
}

module.exports = UserController
