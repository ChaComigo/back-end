"use strict";

const Fator = use("App/Models/Fator");
const Categoria = use("App/Models/Categoria");

class FatorController {
  async index() {
    const fator = await Fator.all();

    return { message: "Listando todos os fatores!", data: fator };
  }

  async store({ params, request, response }) {
    const data_fator = this.parseBody(request);
    const categoria = await Categoria.find(params.id);

    if (categoria) {
      const fator = await Fator.create({
        ...data_fator,
        categoria_id: categoria.id
      });

      return { message: "Fator criado com sucesso!", data: fator };
    } else {
      response.status(404).json({
        message: "Categoria selecionada não encontrada!",
        data: null
      });
    }
  }

  async update({ params, request, response }) {
    const fator = await Fator.find(params.id);
    const data_fator = this.parseBody(request);

    if (fator) {
      fator.merge(data_fator);
      fator.save();
      return { message: "Fator atualizado com sucesso!", data: fator };
    } else {
      response.status(404).json({
        message: "Fator não encontrado!",
        data: null
      });
    }
  }

  async destroy({ params, response }) {
    const fator = await Fator.find(params.id);

    if (fator) {
      await fator.delete();

      return { message: "Fator deletado com sucesso!", data: null };
    } else {
      response.status(404).json({
        message: "Fator não encontrado!",
        data: null
      });
    }
  }

  parseBody(req) {
    return {
      ...req.only(["path_imagem", "descricao", "influencia", "peso", "info"]),
      ...req.params
    };
  }
}

module.exports = FatorController;
