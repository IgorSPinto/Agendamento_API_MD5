import ValidacaoServices from "./ValidacaoServices.js";
import Cliente from "../models/ClienteModel.js"

class ClienteValidacao extends ValidacaoServices {

    static async validarBusca(id){
        const response = await this.exists(Cliente, id)
        return response
    }

    static validarCamposCliente(nome, email, telefone) {
        return this.validarNome(nome) && this.validarEmail(email) && this.validarTelefone(telefone)
    }
    
}

export default ClienteValidacao;

