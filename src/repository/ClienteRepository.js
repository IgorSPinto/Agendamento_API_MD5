import Repository from "./Repository.js"
import Cliente from "../models/ClienteModel.js";

class ClienteRepository extends Repository {

    /**
     * Método para criar endereço do usuário
     * @param {*} data 
     */
    static async criarCliente(data){
        const response = await this.create(Cliente, data)
        const id = JSON.stringify(response._id)
        return id
    }

    /**
     * Método para buscar todos os endereços dos usuários
     * @returns {<Array> Cliente} response
     */
    static async buscarClientes(){
       const response = await this.findAll(Cliente)
       return response
    }

    /**
     * Método para buscar endereço do usuário por ID
     * @param {String} id 
     * @returns {Data}
     */
    static async buscarClientePorId(id){
        const response = await this.findById(Cliente, id)
        return response
    }

    /**
     * Método para atualizar o endereço do usuário por ID
     * @param {String} id 
     * @param {*} data 
     */
    static async atualizarCliente(id, data){
        await this.updateById(Cliente, id, data)
    }

    /**
     * Método para deletar o endereço do usuário por ID
     * @param {String} id 
     */
    static async deletarCliente(id){
        await this.deleteById(Cliente, id)
    }
} export default ClienteRepository