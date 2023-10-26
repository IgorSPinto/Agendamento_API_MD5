import Repository from "../repository/Repository.js"
import Adestrador from "../models/AdestradorModel.js";

class AdestradorRepository extends Repository {

    /**
     * Método para criar endereço do usuário
     * @param {*} data 
     */
    static async criarAdestrador(data){
        const response = await this.create(Adestrador, data)
        const id = JSON.stringify(response._id)
        return id
    }

    /**
     * Método para buscar todos os endereços dos usuários
     * @returns {<Array> Adestrador} response
     */
    static async buscarAdestrador(){
       const response = await this.findAll(Adestrador)
       return response
    }

    /**
     * Método para buscar endereço do usuário por ID
     * @param {String} id 
     * @returns {Data}
     */
    static async buscarAdestradorPorId(id){
        const response = await this.findById(Adestrador, id)
        return response
    }

    /**
     * Método para atualizar o endereço do usuário por ID
     * @param {String} id 
     * @param {*} data 
     */
    static async atualizarAdestrador(id, data){
        await this.updateById(Adestrador, id, data)
    }

    /**
     * Método para deletar o endereço do usuário por ID
     * @param {String} id 
     */
    static async deletarAdestrador(id){
        await this.deleteById(Adestrador, id)
    }
} export default AdestradorRepository