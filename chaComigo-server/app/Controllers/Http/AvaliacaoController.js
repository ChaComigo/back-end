"use strict";

const Avaliacao = use("App/Models/Avaliacao");
const Resposta = use("App/Models/AvaliacaoResposta");

class AvaliacaoController {
  async index() {
    const avaliacao = await Avaliacao.all();
    return { message: "Listando todas as avaliações!", data: avaliacao };
  }

  async store({ request, auth }) {
    const data_avaliacao = request.only(["score", "observacao"]);
    const { avaliacao_respostas } = request.only(["avaliacao_respostas"]);

    var data_avaliacao_respostas = [];

    const avaliacao = await Avaliacao.create({
      ...data_avaliacao,
      pessoa_id: auth.user.id
    });

    avaliacao_respostas.forEach(id => {
      data_avaliacao_respostas.push({
        avaliacao_id: avaliacao.id,
        fator_id: id
      });
    });

    await Resposta.createMany(data_avaliacao_respostas);

    return { message: "Avaliação registrada com sucesso!", data: avaliacao };
  }

  async show({ params, response }) {
    const avaliacao = Avaliacao.find(params.id);

    if (avaliacao) {
      return { message: "Avaliacao encontrada com sucesso!", data: avaliacao };
    } else {
      response.status(404).json({
        message: "Avaliacao não encontrada!",
        data: null
      });
    }
  }

  async update({ params, request, auth }) {
    const data_avaliacao = request.only(["score", "observacao"]);
    const { avaliacao_respostas } = request.only(["avaliacao_respostas"]);

    const avaliacao = await Avaliacao.find(params.id);
    if (auth.user.id == avaliacao.pessoa_id) {
      avaliacao.merge(data_avaliacao);
      avaliacao.save();

      const { rows: lst_avaliacao_resposta } = await Resposta.query()
        .where({ avaliacao_id: avaliacao.id })
        .andWhere("created_at", ">=", this.getDatabase())
        .andWhere("created_at", "<=", this.getDatabase(1))
        .fetch();

      lst_avaliacao_resposta.forEach(async resposta => {
        try {
          await resposta.delete();
        } catch (error) {
          console.log(error);
        }
      });

      var data_avaliacao_respostas = [];

      avaliacao_respostas.forEach(id => {
        data_avaliacao_respostas.push({
          avaliacao_id: avaliacao.id,
          fator_id: id
        });
      });

      await Resposta.createMany(data_avaliacao_respostas);

      return { message: "Avaliação atualizada com sucesso!", data: avaliacao };
    } else {
      response.status(401).json({
        message: "Não autorizado!",
        data: null
      });
    }
  }

  async destroy({ params, request, response }) {}

  getDatabase(moreDay) {
    const data = new Date();
    if (moreDay > 0) {
      data.setDate(data.getDate() + moreDay);
    }

    var mes = data.getMonth();
    if ((mes = "0")) {
      mes = "01";
    }

    return data.getFullYear() + "-" + mes + "-" + data.getDate();
  }
}

module.exports = AvaliacaoController;
