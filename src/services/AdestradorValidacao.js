import ValidacaoServices from "./ValidacaoServices.js";
import Adestrador from "../models/AdestradorModel.js";
import bcrypt from "bcrypt";

class AdestradorValidacao extends ValidacaoServices {
  static async validarBusca(id) {
    const response = await this.exists(Adestrador, id);
    return response;
  }

  static validarCamposAdestrador(nome, email, senha) {
    return this.validarNome(nome) && this.validarEmail(email) && this.validarSenha(senha);
  }

  static async compararSenhas(senhaInformada, senhaHash) {
    return bcrypt.compare(senhaInformada, senhaHash);
  }
}

export default AdestradorValidacao;








