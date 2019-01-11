"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class AvaliacaoResposta extends Model {
  avaliacao() {
    return this.belongsTo("App/Models/Avaliacao");
  }

  fator() {
    return this.belongsTo("App/Models/Fator");
  }
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }
}

module.exports = AvaliacaoResposta;
