import AdestradorRepository from "../repository/AdestradorRepository.js";
import AdestradorValidacao from "../services/AdestradorValidacao.js";

class AdestradorController {
      /**
      * @param {Express} app 
      */

  static rotas(app) {

    app.get("/adestrador", async (req, res) => {
      const adestrador = await AdestradorRepository.buscarAdestrador()
      res.status(200).json(adestrador)
    })

    /**
     * Rota para buscar usuários pelo id
     */
    app.get("/adestrador/:id", async (req, res) => {
      const id = req.params.id
      const valido = await AdestradorValidacao.validarBusca(id)
      if (valido) {
        const adestrador = await AdestradorRepository.buscarClientePorId(id)
        res.status(200).json(adestrador)
      } else {
        res.status(404).json({ message: "Cliente não encontrado" })
      }
    })

    /**
     * Rota para deletar agendamento
     */
    app.delete("/adestrador/:id", async (req, res) => {
      const id = req.params.id
      const valido = await AdestradorValidacao.validarBusca(id)
      if (valido) {
        await AdestradorRepository.deletarAgendamento(id)
        res.status(200).json({ message: 'Cliente deletado com sucesso' })
      } else {
        res.status(404).json({ message: "Cliente não encontrado" })
      }
    })

    /**
     * Rota para inserir um novo agendamento
     */
    app.post("/adestrador", async (req, res) => {
      const body = req.body
      const valido = AdestradorValidacao.validarCamposAdestrador(...Object.values(body))
      if (valido) {
        const id = await AdestradorRepository.criarAdestrador(body)
        res.status(201).json({ message: 'Adestrador criado com sucesso', id: `${id}` })
      } else {
        res.status(400).json({ message: "Operação inválida, verifique os campos e tente novamente" })
      }
    })

    /**
     * Rota para atualizar um registro já existente na tabela agendamento
     */
    app.put("/adestrador/:id", async (req, res) => {
      const id = req.params.id
      const data = req.body
      const valido = await AdestradorValidacao.validarBusca(id)
      if (valido) {
        await AdestradorRepository.atualizarAdestrador(id, data)
        res.status(200).json({ message: "Adestrador atualizado com sucesso" })
      } else {
        res.status(404).json({ message: "Adestrador não encontrado" })
      }
    })
  }
}

export default AdestradorController;
