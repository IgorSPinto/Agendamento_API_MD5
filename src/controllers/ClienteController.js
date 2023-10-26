
import ClienteValidacao from "../services/ClienteValidacao.js";
import ClienteRepository from "../repository/ClienteRepository.js"

class ClientesController {
    /**
     * @param {Express} app 
     */

    static rotas(app) {
        
        app.get("/cliente", async (req, res) => {
            const cliente = await ClienteRepository.buscarClientes()
            res.status(200).json(cliente)
        })

        /**
         * Rota para buscar usuários pelo id
         */
        app.get("/cliente/:id", async (req, res) => {
            const id = req.params.id
            const valido = await ClienteValidacao.validarBusca(id)
            if (valido) {
                const cliente = await ClienteRepository.buscarClientePorId(id)
                res.status(200).json(cliente)
            } else {
                res.status(404).json({ message: "Cliente não encontrado" })
            }
        })

        /**
         * Rota para deletar agendamento
         */
        app.delete("/cliente/:id", async (req, res) => {
            const id = req.params.id
            const valido = await ClienteValidacao.validarBusca(id)
            if (valido) {
                await ClienteRepository.deletarAgendamento(id)
                res.status(200).json({ message: 'Cliente deletado com sucesso' })
            } else {
                res.status(404).json({ message: "Cliente não encontrado" })
            }
        })

        /**
         * Rota para inserir um novo agendamento
         */
        app.post("/cliente", async (req, res) => {
            const body = req.body
			const valido = ClienteValidacao.validarCamposCliente(...Object.values(body))
			if (valido) {
				const id = await ClienteRepository.criarCliente(body)
				res.status(201).json({ message: 'Cliente criado com sucesso', id:`${id}` })
			} else {
				res.status(400).json({ message: "Operação inválida, verifique os campos e tente novamente" })
			}
        })

        /**
         * Rota para atualizar um registro já existente na tabela agendamento
         */
        app.put("/cliente/:id", async (req, res) => {
            const id = req.params.id
			const data = req.body
			const valido = await ClienteValidacao.validarBusca(id)
			if (valido) {
				await ClienteRepository.atualizarAgendamento(id, data)
				res.status(200).json({ message: "Cliente atualizado com sucesso" })
			} else {
				res.status(404).json({ message: "Cliente não encontrado" })
			}
        })
    }
}

export default ClientesController;
