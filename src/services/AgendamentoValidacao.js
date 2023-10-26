import ValidacaoServices from "./ValidacaoServices.js";
import Agendamento from "../models/AgendamentoModel.js"

class AgendamentoValidacao extends ValidacaoServices {

    static async validarBusca(id){
        const response = await this.exists(Agendamento, id)
        return response
    }

    static validarCamposAgendamento(cliente, pet, data, duracao) {
        return this.validarCliente(cliente) && this.validarPet(pet) && this.validarData(data) && this.validarDuracao(duracao) 
    }

}

export default AgendamentoValidacao;