'use strict'

const Model = use('Model')
const Hash = use('Hash')

class Pessoa extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  endereco (){
    return this.belongsTo('App/Models/Endereco')
  }
}

module.exports = Pessoa
