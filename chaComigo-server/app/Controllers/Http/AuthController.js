"use strict";

class AuthController {
  async authenticate({ request, response, auth }) {
    const { email, senha } = request.only(["email", "senha"]);

    try {
      const token = await auth.attempt(email, senha);

      return { message: "Autenticado com sucesso", ...token };
    } catch (error) {
      response.status(401).json({
        message: "Não autorizado. Por favor verifique suas credenciais.",
        type: "bearer",
        token: null,
        refreshToken: null
      });
    }
  }
}

module.exports = AuthController;
