import ValidacaoServices from "./ValidacaoServices.js";
import Adestrador from "../models/AdestradorModel.js"

class AdestradorValidacao extends ValidacaoServices {
  static async validarBusca(id){
        const response = await this.exists(Adestrador, id)
        return response
    }

    static validarCamposAdestrador(nome, email, senha) {
      return this.validarNome(nome) && this.validarEmail(email) && this.validarTelefone(senha)
  }
}

export default AdestradorValidacao;
