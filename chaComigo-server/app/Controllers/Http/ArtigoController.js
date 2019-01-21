"use strict";

const Artigo = use("App/Models/Artigo");

class ArtigoController {
  async index() {
    const artigo = await Artigo.all();

    return { message: "Listando todos os artigos!", data: artigo };
  }

  async store({ request }) {
    const data_artigo = this.parseBody(request);
    const artigo = await Artigo.create(data_artigo);

    return { message: "Artigo criado com sucesso!", data: artigo };
  }

  async show({ params, response }) {
    const artigo = await Artigo.find(params.id);

    if (artigo) {
      return { message: "Artigo encontrado!", data: artigo };
    } else {
      response.status(404).json({
        message: "Artigo não encontrado!",
        data: null
      });
    }
  }

  async update({ params, request, response }) {
    const data_artigo = this.parseBody(request);
    const artigo = await Artigo.find(params.id);

    if (artigo) {
      artigo.merge(data_artigo);
      await artigo.save();
      return { message: "Artigo atualizado!", data: artigo };
    } else {
      response.status(404).json({
        message: "Artigo não encontrado!",
        data: null
      });
    }
  }

  async destroy({ params, response }) {
    const artigo = await Artigo.find(params.id);

    if (artigo) {
      await artigo.delete();
      return { message: "Artigo deletado!", data: null };
    } else {
      response.status(404).json({
        message: "Artigo não encontrado!",
        data: null
      });
    }
  }

  parseBody(req) {
    return {
      ...req.only(["texto", "titulo", "sinopse", "path_imagem"]),
      ...req.params
    };
  }
}

module.exports = ArtigoController;
