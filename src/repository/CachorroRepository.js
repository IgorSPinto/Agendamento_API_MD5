import Repository from "./Repository.js"
import CachorroModel from "../models/CachorroModel.js";

class CachorroRepository extends Repository {

    /**
     * Método para criar endereço do usuário
     * @param {*} data 
     */
    static async inserirCachorro(data){
        const response = await this.create(CachorroModel, data)
        const id = JSON.stringify(response._id)
        return id
    }

    /**
     * Método para buscar todos os endereços dos usuários
     * @returns {<Array> Endereco} response
     */
    static async buscarTodosOsCachorros(){
       const response = await this.findAll(CachorroModel)
       return response
    }

    /**
     * Método para buscar endereço do usuário por ID
     * @param {String} id 
     * @returns {Data}
     */
    static async buscarCachorroPorId(id){
        const response = await this.findById(CachorroModel, id)
        return response
    }

    /**
     * Método para atualizar o endereço do usuário por ID
     * @param {String} id 
     * @param {*} data 
     */
    static async atualizarCachorroPorId(id, data){
        await this.updateById(CachorroModel, id, data)
    }

    /**
     * Método para deletar o endereço do usuário por ID
     * @param {String} id 
     */
    static async deletarCachorroPorId(id){
        await this.deleteById(CachorroModel, id)
    }
} export default CachorroRepository