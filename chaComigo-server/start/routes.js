"use strict";

const Route = use("Route");

Route.post("/auth", "AuthController.authenticate");

Route.resource("/artigos", "ArtigoController").apiOnly();
Route.resource("/avaliacoes", "AvaliacaoController")
  .apiOnly()
  .middleware("auth");

//DA UMA OLHADA PRA PEGAR AS RESPOSTAS TERIA QUE SER UMA URI DO TIPO
// /AVALICOES/ID:23/RESPOSTAS
//Route.resource("/avaliacaoRespostas", "AvaliacaoRespostaController").apiOnly();
Route.resource("/categorias", "CategoriaController").apiOnly();

Route.resource("/fatores", "FatorController").only([
  "index",
  "delete",
  "update"
]);
Route.post("/fatores", "FatorController.store").prefix("/categorias/:id");

Route.resource(
  "/historicorelacionamentos",
  "historicoRelacionamentoController"
).apiOnly();
Route.resource("/pessoas", "PessoaController").apiOnly();
