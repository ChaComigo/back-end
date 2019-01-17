"use strict";

const Route = use("Route");

Route.resource("/users", "PessoaController").apiOnly();
Route.resource("/categorias", "CategoriaController").apiOnly();
Route.post("/login", "LoginController.login");
