"use strict";

class LoginController {
  async login({ request, response, auth }) {
    const { email, senha } = request.only(["email", "senha"]);

    try {
      const token = await auth.attempt(email, senha);

      return token;
    } catch (error) {
      return response.unauthorized(
        "Não autorizado. Por favor verifique suas credenciais."
      );
    }
  }
}

module.exports = LoginController;
