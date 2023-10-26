import Repository from "../repository/Repository.js";
import Adestrador from "../models/AdestradorModel.js";

class AdestradorRepository extends Repository {

    /**
     * Método para criar adestrador
     * @param {*} data 
     * @returns {String} - ID do novo adestrador
     */
    static async criarAdestrador(data) {
        const response = await this.create(Adestrador, data);
        const id = JSON.stringify(response._id);
        return id;
    }

    /**
     * Método para buscar todos os adestradores
     * @returns {Array} - Lista de todos os adestradores
     */
    static async buscarAdestrador() {
        const response = await this.findAll(Adestrador);
        return response;
    }

    /**
     * Método para buscar adestrador por ID
     * @param {String} id 
     * @returns {Data} - Dados do adestrador encontrado
     */
    static async buscarAdestradorPorId(id) {
        const response = await this.findById(Adestrador, id);
        return response;
    }

    /**
     * Método para atualizar um adestrador por ID
     * @param {String} id 
     * @param {*} data 
     */
    static async atualizarAdestrador(id, data) {
        await this.updateById(Adestrador, id, data);
    }

    /**
     * Método para deletar um adestrador por ID
     * @param {String} id 
     */
    static async deletarAdestrador(id) {
        await this.deleteById(Adestrador, id);
    }

    /**
     * Método para buscar um adestrador por email
     * @param {String} email 
     * @returns {Adestrador|null} - Retorna o adestrador se encontrado ou null se não encontrado.
     */
    static async buscarAdestradorPorEmail(email) {
        const response = await this.findOne(Adestrador, { email });
        return response;
    }

    // Implementação do método findOne 
    static async findOne(mongoModel, query) {
        const response = await mongoModel.findOne(query);
        return response;
    }
}

export default AdestradorRepository;
