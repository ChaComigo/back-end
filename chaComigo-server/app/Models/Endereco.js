"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Endereco extends Model {
  pessoas() {
    return this.belongsTo("App/Models/Pessoa");
  }
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }
}

module.exports = Endereco;
