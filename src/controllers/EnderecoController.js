import EnderecoModel from "../models/EnderecoModel.js"
import EnderecoValidacao from "../services/EnderecoValidacao.js"
import EnderecoRepository from "../repository/EnderecoRepository.js"

class EnderecoController {
    /**
     * Método para centralização de rotas no controller
     * @param {Express} app 
     */
    static rotas(app) {
        /**
         * Rota para buscar todos os endereços
         */
        app.get("/endereco", async (req, res) => {
            const endereco = await EnderecoRepository.buscarTodosOsEnderecos()
            res.status(200).json(endereco)
        })

        /**
         * Rota para buscar endereços pelo id
         */
        app.get("/endereco/:id", async (req, res) => {
            const id = req.params.id
            try {
                const endereco = await EnderecoRepository.buscarEnderecoPorId(id);
                if (endereco) {
                    res.status(200).json(endereco);
                } else {
                    res.status(404).json({ error: true, message: `Endereço não encontrado para o id ${id}` });
                }
            } catch (error) {
                res.status(500).json({ error: true, message: "Erro ao buscar endereço" });
            }
        })

        /**
         * Rota para deletar endereço
         */
        app.delete("/endereco/:id", async (req, res) => {
            const id = req.params.id
            try {
                const endereco = await EnderecoRepository.buscarEnderecoPorId(id);
                if (endereco) {
                    await EnderecoRepository.deletarEnderecoPorId(id);
                    res.status(200).json({ error: false });
                } else {
                    res.status(404).json({ error: true, message: `Endereço não encontrado para o id ${id}` });
                }
            } catch (error) {
                res.status(500).json({ error: true, message: "Erro ao deletar endereço" });
            }
        })

        /**
         * Rota para inserir um novo endereço
         */
        app.post("/endereco", async (req, res) => {
            const body = req.body
            const valido = EnderecoValidacao.validaCamposEndereco(...Object.values(body))
            if(valido) {
                const id = await EnderecoRepository.inserirEndereco(body)
                res.status(201).json({ message: 'Endereço do Usuário criado com sucesso', id: `${id}`})
            } else {
                res.status(400).json({message:"Operação inválida, verifique os campos e tente novamente"})
            }
        })

        /**
         * Rota para atualizar um registro já existente na tabela endereços
         */
        app.put("/endereco/:id", async (req, res) => {
            const id = req.params.id
            const body = req.body
            try {
                EnderecoValidacao.validaCamposEndereco(body.cep, body.numero, body.complemento)
                await EnderecoValidacao.validarExistencia(id)
                const enderecoModelado = new EnderecoModel(body.cep, body.numero, body.complemento)
                EnderecoRepository.atualizarEnderecoPorId(id, enderecoModelado)
                res.status(204).json()
            } catch (error) {
                if (error.message == "Campos invalidos") {
                    res.status(400).json({ error: error.message })
                } else {
                    res.status(404).json({ id: id, ...error })
                }
            }
        })
    }
}

export default EnderecoController