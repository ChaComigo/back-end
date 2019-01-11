"use strict";

const Pessoa = use("App/Models/Pessoa");
const Endereco = use("App/Models/Endereco");

class PessoaController {
  async index({ request, response, view }) {}

  async store({ request, response }) {
    const requestBody = this.parseBody(request);

    /*
    if (!(await validate(requestBody, personRules.store, response))) {
      return null;
    }
    */

    const pessoa = await Pessoa.create(requestBody);
    const data_endereco = request.only(["cep", "cidade", "estado"]);
    data_endereco["pessoa_id"] = pessoa.id;
    const endereco = Endereco.create(data_endereco);

    return pessoa;
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}

  parseBody(req) {
    return {
      ...req.only(["email", "nome", "senha", "data_nascimento", "genero"]),
      ...req.params
    };
  }
}

module.exports = PessoaController;
