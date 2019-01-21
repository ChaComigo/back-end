"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Categoria extends Model {
  fatores() {
    return this.hasMany("App/Models/Fator");
  }
}

module.exports = Categoria;
