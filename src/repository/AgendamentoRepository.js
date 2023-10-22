import Repository from "./Repository.js"
import AgendamentoModel from "../models/AgendamentoModel.js";

class AgendamentoRepository extends Repository {

    /**
     * Método para criar endereço do usuário
     * @param {*} data 
     */
    static async inserirAgendamento(data){
        const response = await this.create(AgendamentoModel, data)
        const id = JSON.stringify(response._id)
        return id
    }

    /**
     * Método para buscar todos os endereços dos usuários
     * @returns {<Array> Endereco} response
     */
    static async buscarTodosEmAgendamento(){
       const response = await this.findAll(AgendamentoModel)
       return response
    }

    /**
     * Método para buscar endereço do usuário por ID
     * @param {String} id 
     * @returns {Data}
     */
    static async buscarAgendamentoPorId(id){
        const response = await this.findById(AgendamentoModel, id)
        return response
    }

    /**
     * Método para atualizar o endereço do usuário por ID
     * @param {String} id 
     * @param {*} data 
     */
    static async atualizarAgendamentoPorId(id, data){
        await this.updateById(AgendamentoModel, id, data)
    }

    /**
     * Método para deletar o endereço do usuário por ID
     * @param {String} id 
     */
    static async deletarAgendamentoPorId(id){
        await this.deleteById(AgendamentoModel, id)
    }
} export default AgendamentoRepository