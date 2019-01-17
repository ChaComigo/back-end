"use strict";
const Categoria = use("App/Models/Categoria");

class CategoriaController {
  async index({ request, response, view }) {
    return Categoria.query()
      .with("fatores")
      .fetch();
  }

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = CategoriaController;
