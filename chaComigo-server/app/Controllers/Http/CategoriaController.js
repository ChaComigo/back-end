"use strict";

const Categoria = use("App/Models/Categoria");

class CategoriaController {
  async index() {
    const categoria = await Categoria.query()
      .with("fatores")
      .fetch();

    return { message: "Listando todas as categorias!", data: categoria };
  }

  async store({ request }) {
    const data_categoria = request.only(["descricao"]);
    const categoria = await Categoria.create(data_categoria);

    return { message: "Categoria criada com sucesso!", data: categoria };
  }

  async show({ params }) {
    const categoria = await Categoria.query()
      .where({ id: params.id })
      .with("fatores")
      .fetch();

    return { message: "Categoria encontrada com sucesso!", data: categoria };
  }

  async update({ params, request }) {
    const categoria = await Categoria.find(params.id);
    const data_categoria = request.only(["descricao"]);

    if (categoria) {
      categoria.merge(data_categoria);
      await categoria.save();

      return { message: "Categoria atualizada com sucesso!", data: categoria };
    } else {
      response.status(404).json({
        message: "Categoria não encontrada!",
        data: null
      });
    }
  }

  async destroy({ params, response }) {
    const categoria = await Categoria.find(params.id);

    if (categoria) {
      await categoria.delete();
      return { message: "Categoria excluida com sucesso!", data: null };
    } else {
      response.status(404).json({
        message: "Categoria não encontrada!",
        data: null
      });
    }

    return;
  }
}

module.exports = CategoriaController;
