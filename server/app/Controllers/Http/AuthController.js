'use strict'

const User = use('App/Models/User')
const Commerce = use('App/Models/Commerce')

class AuthController {
  async login({ request, auth }){
    const { username, password } = request.all()
    const user = await User.findBy('username', username)
    const token = await auth.attempt(username, password)
    const commerce = await Commerce.findBy('user_id', user.id)
    return {
      username: username,
      commerce_id: commerce.id,
      commerce_name: commerce.name,
      commerce_tir: commerce.tir,
      token: token
    }
  }

  async register( {request} ){
    const { username, password } = request.all()
    const user = await User.create({
      username, password
    })
    return user // this.login(...arguments);
  }
}

module.exports = AuthController
