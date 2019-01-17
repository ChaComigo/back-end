"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Avaliacao extends Model {
  avaliacaoRespostas() {
    return this.hasMany("App/Models/AvaliacaoResposta");
  }

  pessoa() {
    return this.belongsTo("App/Models/Pessoa");
  }
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }
}

module.exports = Avaliacao;
