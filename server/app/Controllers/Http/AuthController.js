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

  async profile ({ request, response, auth }) {
    let user = await auth.getUser()
    const userInput = request.input('user') // const { userInput } = request.all()
    user.email = userInput['email']         // user.email = userInput.email
    user.username = userInput['username']   // user.username = userInput.username
    await user.save()

    const logged = await auth.generate(user, true)

    return response.json(logged)
  }
}

module.exports = AuthController
