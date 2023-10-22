import Repository from "./Repository.js"
import ClienteModel from "../models/ClienteModel.js";

class ClienteRepository extends Repository {

    /**
     * Método para criar endereço do usuário
     * @param {*} data 
     */
    static async inserirCliente(data){
        const response = await this.create(ClienteModel, data)
        const id = JSON.stringify(response._id)
        return id
    }

    /**
     * Método para buscar todos os endereços dos usuários
     * @returns {<Array> Endereco} response
     */
    static async buscarTodosOsClientes(){
       const response = await this.findAll(ClienteModel)
       return response
    }

    /**
     * Método para buscar endereço do usuário por ID
     * @param {String} id 
     * @returns {Data}
     */
    static async buscarClientePorId(id){
        const response = await this.findById(ClienteModel, id)
        return response
    }

    /**
     * Método para atualizar o endereço do usuário por ID
     * @param {String} id 
     * @param {*} data 
     */
    static async atualizarClientePorId(id, data){
        await this.updateById(ClienteModel, id, data)
    }

    /**
     * Método para deletar o endereço do usuário por ID
     * @param {String} id 
     */
    static async deletarClientePorId(id){
        await this.deleteById(ClienteModel, id)
    }
} export default ClienteRepository