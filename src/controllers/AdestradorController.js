import AdestradorRepository from "../repository/AdestradorRepository.js";
import AdestradorModel from "../models/AdestradorModel.js";
import ValidacaoServices from "../services/AdestradorValidacao.js";

class AdestradorController {
  /**
   * Método para centralização de rotas no controller
   * @param {Express} app 
   */
  static rotas(app) {
    /**
     * Rota para buscar todos os Adestradores
     */
    app.get("/config", async (req, res) => {
      const adestrador = await AdestradorRepository.buscarTodosEmAdestrador();
      res.status(200).json(adestrador);
    });

    /**
     * Rota para buscar adestradores pelo id
     */
    app.get("/config/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const adestrador = await AdestradorRepository.buscarAdestradorPorId(id);
        if (adestrador) {
          res.status(200).json(adestrador);
        } else {
          res.status(404).json({ error: true, message: `Adestrador não encontrado para o id ${id}` });
        }
      } catch (error) {
        res.status(500).json({ error: true, message: "Erro ao buscar adestrador" });
      }
    });

        /**
         * Rota para deletar adestrador
         */
        app.delete("/adestrador/:id", async (req, res) => {
            const id = req.params.id
            try {
                const adestrador = await AdestradorRepository.buscarAdestradorPorId(id);
                if (adestrador) {
                    await AdestradorDAO.deletarAdestradorPorId(id);
                    res.status(200).json({ error: false });
                } else {
                    res.status(404).json({ error: true, message: `Adestrador não encontrado para o id ${id}` });
                }
            } catch (error) {
                res.status(500).json({ error: true, message: "Erro ao deletar adestrador" });
            }
        })

    // Rota para inserir um novo adestrador
    app.post("/config", async (req, res) => {
      const body = req.body;

      // Verifique se todos os campos obrigatórios estão presentes na requisição
      if (!body.nome || !body.email || !body.senha) {
        res.status(400).json({ error: true, message: "Campos obrigatórios não preenchidos" });
        return; // Encerre a função aqui para evitar a execução do código abaixo
      }

      const adestradorModelado = new AdestradorModel(body.nome, body.email, body.senha);
      try {
        await AdestradorRepository.inserirAdestrador(adestradorModelado);
        res.status(201).json({
          error: false,
          message: "Adestrador cadastrado com sucesso"
        });
      } catch (error) {
        res.status(503).json({ error: true, message: "Servidor indisponível no momento" });
      }
    });

    /**
     * Rota para atualizar um registro de um adestrador
     */
    app.put("/config/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      try {
        ValidacaoServices.validaCamposAdestrador(body.nome, body.email, body.senha);
        await ValidacaoServices.validarExistencia(id);
        const adestradorModelado = new AdestradorModel(body.nome, body.email, body.senha);
        await AdestradorRepository.atualizarAdestradorPorId(id, adestradorModelado);
        res.status(204).json();
      } catch (error) {
        if (error.message === "Campos inválidos") {
          res.status(400).json({ error: error.message });
        } else {
          res.status(404).json({ id: id, ...error });
        }
      }
    });

    /**
     * Rota para realizar o login de um adestrador
     */
    app.post("/login", async (req, res) => {
      const { email, senha } = req.body;

      // Verifique se o email e senha estão presentes na requisição
      if (!email || !senha) {
        res.status(400).json({ error: true, message: "Email e senha são obrigatórios." });
        return;
      }

      try {
        // Realize a autenticação do adestrador com base no email e senha
        const adestrador = await AdestradorRepository.autenticarAdestrador(email, senha);

        if (adestrador) {
          // Autenticação bem-sucedida, gere um token JWT e envie como resposta
          const token = adestrador.generateAuthToken();
          res.status(200).json({ token });
        } else {
          // Autenticação falhou
          res.status(401).json({ error: true, message: "Credenciais inválidas" });
        }
      } catch (error) {
        res.status(500).json({ error: true, message: "Erro ao realizar o login" });
      }
    });
  }
}

export default AdestradorController;
