import AgendamentoRepository from "../repository/AgendamentoRepository.js"
import AgendamentoValidacao from "../services/AgendamentoValidacao.js"


class AgendamentoController {
    /**
     * @param {Express} app 
     */

    static rotas(app) {
        
        app.get("/agendamento", async (req, res) => {
            const agendamento = await AgendamentoRepository.buscarAgendamento()
            res.status(200).json(agendamento)
        })

        /**
         * Rota para buscar usuários pelo id
         */
        app.get("/agendamento/:id", async (req, res) => {
            const id = req.params.id
            const valido = await AgendamentoValidacao.validarBusca(id)
            if (valido) {
                const agendamento = await AgendamentoRepository.buscarAgendamentoPorId(id)
                res.status(200).json(agendamento)
            } else {
                res.status(404).json({ message: "Agendamento não encontrado" })
            }
        })

        /**
         * Rota para deletar agendamento
         */
        app.delete("/agendamento/:id", async (req, res) => {
            const id = req.params.id
            const valido = await AgendamentoValidacao.validarBusca(id)
            if (valido) {
                await AgendamentoRepository.deletarAgendamento(id)
                res.status(200).json({ message: 'Agendamento deletado com sucesso' })
            } else {
                res.status(404).json({ message: "Agendamento não encontrado" })
            }
        })

        /**
         * Rota para inserir um novo agendamento
         */
        app.post("/agendamento", async (req, res) => {
            const body = req.body
			const valido = AgendamentoValidacao.validarCamposAgendamento(...Object.values(body))
			if (valido) {
				const id = await AgendamentoRepository.criarAgendamento(body)
				res.status(201).json({ message: 'Agendamento criado com sucesso', id:`${id}` })
			} else {
				res.status(400).json({ message: "Operação inválida, verifique os campos e tente novamente" })
			}
        })

        /**
         * Rota para atualizar um registro já existente na tabela agendamento
         */
        app.put("/agendamento/:id", async (req, res) => {
            const id = req.params.id
			const data = req.body
			const valido = await AgendamentoValidacao.validarBusca(id)
			if (valido) {
				await AgendamentoRepository.atualizarAgendamento(id, data)
				res.status(200).json({ message: "Agendamento atualizado com sucesso" })
			} else {
				res.status(404).json({ message: "Agendamento não encontrado" })
			}
        })
    }
}

export default AgendamentoController