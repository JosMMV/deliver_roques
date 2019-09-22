'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const Commerce = use('App/Models/Commerce')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    /*
      * Create new commerce after create an user
    */
    this.addHook('afterCreate', async userInstance => {
      let commerce = new Commerce()
      commerce.fill({
        user_id: userInstance.id,
        tir: (Math.floor(Math.random() * 9999999) + 1) + '',
        name: 'My name is: ' + (Math.floor(Math.random() * 99999) + 1)
      })
      userInstance.commerce().save(commerce);
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  commerce () {
    return this.hasOne('App/Models/Commerce')
  }
}

module.exports = User
