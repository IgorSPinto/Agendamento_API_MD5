class Repository {
    /**
     * Método geral de registro
     * @param {mongooseModel} mongoModel 
     * @param {Object} data 
     */
<<<<<<< HEAD
    static async create(mongoModel, data){
        return await mongoModel.create(data)
=======
    static async inserir(mongoModel, data){
        return await mongoModel.create(data);
>>>>>>> 5fa10c9452a5aea4c41b4103e781c33dd3a219cb
    }

    /**
     * Método geral para buscar todos os itens
     * @param {mongooseModel} mongoModel 
     * @returns {<Array> Data}
     */
    static async findAll(mongoModel){
<<<<<<< HEAD
        const response = await mongoModel.find()
        return response
=======
       const response = await mongoModel.find();
       return response;
>>>>>>> 5fa10c9452a5aea4c41b4103e781c33dd3a219cb
    }

    /**
     * Método geral para buscar por ID
     * @param {mongooseModel} mongoModel 
     * @param {String} id 
     * @returns {Data}
     */
<<<<<<< HEAD
    static async findById(mongoModel, id){
        const response = await mongoModel.findOne({_id:id})
        return response
=======
    static async buscarPorId(mongoModel, id){
        const response = await mongoModel.findOne({ _id: id });
        return response;
>>>>>>> 5fa10c9452a5aea4c41b4103e781c33dd3a219cb
    }

    /**
     * Método geral de atualização por ID
     * @param {mongooseModel} mongoModel 
     * @param {String} id 
     * @param {Object} data 
     * @returns {Data}
     */
<<<<<<< HEAD
    static async updateById(mongoModel, id, data){
        await mongoModel.updateOne({_id:id}, data)
=======
    static async atualizarPorId(mongoModel, id, data){
        await mongoModel.updateOne({ _id: id }, data);
>>>>>>> 5fa10c9452a5aea4c41b4103e781c33dd3a219cb
    }

    /**
     * Método geral de deleção por ID
     * @param {mongooseModel} mongoModel 
     * @param {String} id 
     */
<<<<<<< HEAD
    static async deleteById(mongoModel, id){
        await mongoModel.findOneAndDelete({_id:id})
=======
    static async deletarPorId(mongoModel, id){
        await mongoModel.findOneAndDelete({ _id: id });
>>>>>>> 5fa10c9452a5aea4c41b4103e781c33dd3a219cb
    }
}

export default Repository;
