"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Fator extends Model {
  static get table() {
    return "fatores";
  }
  categoria() {
    return this.belongsTo("App/Models/Categoria");
  }

  avaliacaoRespostas() {
    return this.hasMany("App/Models/AvaliacaoResposta");
  }
}

module.exports = Fator;
