import Repository from "../repository/Repository.js"
import AdestradorModel from "../models/AdestradorModel.js";

class AdestradorRepository extends Repository {

    /**
     * Método para criar endereço do usuário
     * @param {*} data 
     */
    static async inserirAdestrador(data){
        const response = await this.create(AdestradorModel, data)
        const id = JSON.stringify(response._id)
        return id
    }

    /**
     * Método para buscar todos os endereços dos usuários
     * @returns {<Array> Endereco} response
     */
    static async buscarTodosEmAdestrador(){
       const response = await this.findAll(AdestradorModel)
       return response
    }

    /**
     * Método para buscar endereço do usuário por ID
     * @param {String} id 
     * @returns {Data}
     */
    static async buscarAdestradorPorId(id){
        const response = await this.findById(AdestradorModel, id)
        return response
    }

    /**
     * Método para atualizar o endereço do usuário por ID
     * @param {String} id 
     * @param {*} data 
     */
    static async atualizarAdestradorPorId(id, data){
        await this.updateById(AdestradorModel, id, data)
    }

    /**
     * Método para deletar o endereço do usuário por ID
     * @param {String} id 
     */
    static async deletarAdestradorPorId(id){
        await this.deleteById(AdestradorModel, id)
    }
} export default AdestradorRepository