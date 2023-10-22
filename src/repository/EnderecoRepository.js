import Repository from "./Repository.js"
import EnderecoModel from "../models/EnderecoModel.js";

class EnderecoRepository extends Repository {

    /**
     * Método para criar endereço do usuário
     * @param {*} data 
     */
    static async inserirEndereco(data){
        const response = await this.create(EnderecoModel, data)
        const id = JSON.stringify(response._id)
        return id
    }

    /**
     * Método para buscar todos os endereços dos usuários
     * @returns {<Array> Endereco} response
     */
    static async buscarTodosOsEnderecos(){
       const response = await this.findAll(EnderecoModel)
       return response
    }

    /**
     * Método para buscar endereço do usuário por ID
     * @param {String} id 
     * @returns {Data}
     */
    static async buscarEnderecoPorId(id){
        const response = await this.findById(EnderecoModel, id)
        return response
    }

    /**
     * Método para atualizar o endereço do usuário por ID
     * @param {String} id 
     * @param {*} data 
     */
    static async atualizarEnderecoPorId(id, data){
        await this.updateById(EnderecoModel, id, data)
    }

    /**
     * Método para deletar o endereço do usuário por ID
     * @param {String} id 
     */
    static async deletarEnderecoPorId(id){
        await this.deleteById(EnderecoModel, id)
    }
} export default EnderecoRepository