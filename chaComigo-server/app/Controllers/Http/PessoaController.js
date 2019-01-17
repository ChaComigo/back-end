"use strict";

const Pessoa = use("App/Models/Pessoa");
const Endereco = use("App/Models/Endereco");
const Database = use("Database");

class PessoaController {
  async index({ response }) {
    const pessoa = await Pessoa.query()
      .with("enderecos")
      .fetch();

    response.status(200).json({
      message: "Solicitação ok",
      code: 0,
      data: pessoa
    });
  }

  async store({ request, response }) {
    const data_pessoa = this.parseBody(request);
    const data_endereco = request.only(["enderecos"]).enderecos[0];

    const trx = await Database.beginTransaction();

    try {
      const pessoa = await Pessoa.create(data_pessoa, trx);
      await Endereco.create({ ...data_endereco, pessoa_id: pessoa.id }, trx);
      await trx.commit();

      const data = await Pessoa.query()
        .where({ id: pessoa.id })
        .with("enderecos")
        .first();

      response.status(201).json({
        message: "Solicitação ok",
        code: 0,
        data: data
      });
    } catch (error) {
      await trx.rollback();
      return error;
    }
  }

  async show({ params }) {
    return await Pessoa.query()
      .where({ id: params.id })
      .with("enderecos")
      .first();
  }

  async update({ params, request }) {
    const pessoa = await Pessoa.findOrFail(params.id);

    const data_pessoa = this.parseBody(request);

    const endereco = (await Endereco.query()
      .where("pessoa_id", pessoa.id)
      .fetch()).rows[0];

    const data_endereco = request.only(["cep", "cidade", "estado"]);

    const trx = await Database.beginTransaction();

    try {
      pessoa.merge(data_pessoa);
      await pessoa.save(trx);
      endereco.merge(data_endereco);
      await endereco.save(trx);
      await trx.commit();

      return pessoa;
    } catch (error) {
      await trx.rollback();
      return error;
    }
  }

  parseBody(req) {
    return {
      ...req.only(["email", "nome", "senha", "data_nascimento", "genero"]),
      ...req.params
    };
  }
}

module.exports = PessoaController;
