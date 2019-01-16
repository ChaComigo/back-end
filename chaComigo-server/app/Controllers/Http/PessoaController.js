"use strict";

const Pessoa = use("App/Models/Pessoa");
const Endereco = use("App/Models/Endereco");
const Database = use("Database");

class PessoaController {
  async index() {
    return Pessoa.query()
      .with("enderecos")
      .fetch();
  }

  async store({ request, response }) {
    const data_pessoa = request.only([
      "email",
      "nome",
      "senha",
      "data_nascimento",
      "genero"
    ]);
    const data_endereco = request.only(["cep", "cidade", "estado"]);

    const trx = await Database.beginTransaction();

    try {
      const pessoa = await Pessoa.create(data_pessoa, trx);
      const endereco = await Endereco.create(
        { ...data_endereco, pessoa_id: pessoa.id },
        trx
      );
      await trx.commit();

      return pessoa;
    } catch (error) {
      await trx.rollback();
      return error;
    }
  }

  async show({ params }) {
    return Pessoa.query()
      .where({ id: params.id })
      .with("enderecos")
      .first();
  }

  async update({ params, request }) {
    const pessoa = await Pessoa.findOrFail(params.id);

    const data_pessoa = request.only([
      "email",
      "nome",
      "senha",
      "data_nascimento",
      "genero"
    ]);

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

  async destroy({ params, request, response }) {}

  parseBody(req) {
    return {
      ...req.only(["email", "nome", "senha", "data_nascimento", "genero"]),
      ...req.params
    };
  }
}

module.exports = PessoaController;
