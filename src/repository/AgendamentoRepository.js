import Repository from "./Repository.js"
import Agendamento from "../models/AgendamentoModel.js";

class AgendamentoRepository extends Repository {

    /**
     * Método para criar endereço do usuário
     * @param {*} data 
     */
    static async criarAgendamento(data){
        const response = await this.create(Agendamento, data)
        const id = JSON.stringify(response._id)
        return id
    }

    /**
     * Método para buscar todos os endereços dos usuários
     * @returns {<Array> Agendamento} response
     */
    static async buscarAgendamento(){
       const response = await this.findAll(Agendamento)
       return response
    }

    /**
     * Método para buscar endereço do usuário por ID
     * @param {String} id 
     * @returns {Data}
     */
    static async buscarAgendamentoPorId(id){
        const response = await this.findById(Agendamento, id)
        return response
    }

    /**
     * Método para atualizar o endereço do usuário por ID
     * @param {String} id 
     * @param {*} data 
     */
    static async atualizarAgendamento(id, data){
        await this.updateById(Agendamento, id, data)
    }

    /**
     * Método para deletar o endereço do usuário por ID
     * @param {String} id 
     */
    static async deletarAgendamento(id){
        await this.deleteById(Agendamento, id)
    }
} export default AgendamentoRepository