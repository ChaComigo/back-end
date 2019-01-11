"use strict";

const Model = use("Model");
const Hash = use("Hash");

class Pessoa extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.senha) {
        userInstance.senha = await Hash.make(userInstance.senha);
      }
    });
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }

  endereco() {
    return this.hasMany("App/Models/Endereco");
  }

  avaliacao() {
    return this.hasMany("App/Models/Avaliacao");
  }
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }
}

module.exports = Pessoa;
