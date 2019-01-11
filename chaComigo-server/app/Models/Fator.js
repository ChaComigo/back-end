"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Fator extends Model {
  categoria() {
    return this.belongsTo("App/Models/Categoria");
  }

  avaliacaoResposta() {
    return this.hasMany("App/Models/AvaliacaoResposta");
  }
}

module.exports = Fator;
