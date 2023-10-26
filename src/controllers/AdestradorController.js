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
     * Rota para buscar adestrador pelo id
     */
    app.get("/adestrador/:id", async (req, res) => {
      const id = req.params.id
      const valido = await AdestradorValidacao.validarBusca(id)
      if (valido) {
        const adestrador = await AdestradorRepository.buscarAdestradorPorId(id)
        res.status(200).json(adestrador)
      } else {
        res.status(404).json({ message: "Adestrador não encontrado" })
      }
    })

    /**
     * Rota para deletar adestrador
     */
    app.delete("/adestrador/:id", async (req, res) => {
      const id = req.params.id
      const valido = await AdestradorValidacao.validarBusca(id)
      if (valido) {
        await AdestradorRepository.deletarAdestrador(id)
        res.status(200).json({ message: 'Adestrador deletado com sucesso' })
      } else {
        res.status(404).json({ message: "Adestrador não encontrado" })
      }
    })

   /**
 * Rota para inserir um novo adestrador
 */
   app.post("/adestrador", async (req, res) => {
    const body = req.body;
    // Verifique se o email já existe no banco de dados
    const emailExistente = await AdestradorRepository.buscarAdestradorPorEmail(body.email);
  
    if (emailExistente) {
      res.status(400).json({ message: "O email já está em uso." });
    } else {
      try {
        const novoAdestrador = new Adestrador(body);
        await novoAdestrador.save();
        res.status(201).json({ message: 'Adestrador criado com sucesso', id: novoAdestrador._id });
      } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor." });
      }
    }
  });

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
    
    /*Rota  para  realizar login do adestrador*/
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const adestrador = await AdestradorRepository.buscarAdestradorPorEmail(email);
    
      if (adestrador) {
        // Adestrador encontrado, agora verifique se a senha corresponde ao email
        if (adestrador.password === password) {
          // Credenciais corretas
          res.status(200).json({ message: "Login bem-sucedido", adestrador });
        } else {
          // Senha incorreta
          res.status(401).json({ message: "Senha incorreta" });
        }
      } else {
        // Adestrador não encontrado
        res.status(401).json({ message: "Credenciais inválidas" });
      }
    });
  }
}

export default AdestradorController;
