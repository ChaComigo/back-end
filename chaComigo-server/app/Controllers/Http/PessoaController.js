"use strict";

const Pessoa = use("App/Models/Pessoa");
const Endereco = use("App/Models/Endereco");

class PessoaController {
  async index() {
    const pessoa = await Pessoa.query()
      .with("enderecos")
      .fetch();

    return { message: "Todos os usuários", data: pessoa };
  }

  async store({ request, response }) {
    const data_pessoa = this.parseBody(request);
    const data_endereco = request.only(["enderecos"]).enderecos[0];

    const pessoa_find = await Pessoa.query()
      .where({ email: data_pessoa.email })
      .first();

    if (pessoa_find) {
      response.status(400).json({
        message: "E-mail já cadastrado!",
        data: null
      });
    } else {
      const pessoa = await Pessoa.create(data_pessoa);
      await Endereco.create({ ...data_endereco, pessoa_id: pessoa.id });

      const data = await Pessoa.query()
        .where({ id: pessoa.id })
        .with("enderecos")
        .first();

      return { message: "Usuário criado com sucesso!", data: data };
    }
  }

  async show({ params, response }) {
    const pessoa = await Pessoa.query()
      .where({ id: params.id })
      .with("enderecos")
      .first();

    if (pessoa) {
      return { message: "Usuário encontrado!", data: pessoa };
    } else {
      return response.status(404).json({
        message: "Usuário não encontrado!",
        data: null
      });
    }
  }

  async update({ params, request }) {
    const pessoa = await Pessoa.findOrFail(params.id);

    const data_pessoa = this.parseBody(request);

    const endereco = (await Endereco.query()
      .where("pessoa_id", pessoa.id)
      .fetch()).rows[0];

    const data_endereco = request.only(["cep", "cidade", "estado"]);
    pessoa.merge(data_pessoa);
    await pessoa.save();
    endereco.merge(data_endereco);
    await endereco.save();

    const data = await Pessoa.query()
      .where({ id: pessoa.id })
      .with("enderecos")
      .first();

    return { message: "Usuário atualizado!", data: data };
  }

  parseBody(req) {
    return {
      ...req.only(["email", "nome", "senha", "data_nascimento", "genero"]),
      ...req.params
    };
  }
}

module.exports = PessoaController;
