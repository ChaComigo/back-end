"use strict";

const Fator = use("App/Models/Fator");

class FatorController {
  async index({ request, response, view }) {
    return Fator.all();
  }

  async store({ request, response }) {}

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = FatorController;
