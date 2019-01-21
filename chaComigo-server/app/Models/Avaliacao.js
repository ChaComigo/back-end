"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Avaliacao extends Model {
  static get table() {
    return "avaliacoes";
  }
  avaliacaoRespostas() {
    return this.hasMany("App/Models/AvaliacaoResposta");
  }

  pessoa() {
    return this.belongsTo("App/Models/Pessoa");
  }
}

module.exports = Avaliacao;
