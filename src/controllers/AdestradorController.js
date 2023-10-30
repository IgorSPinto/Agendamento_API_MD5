import Adestrador from "../models/AdestradorModel.js";
import AdestradorRepository from "../repository/AdestradorRepository.js";
import AdestradorValidacao from "../services/AdestradorValidacao.js";
import bcrypt from "bcrypt";

class AdestradorController {
  static rotas(app) {
    app.get("/adestrador", async (req, res) => {
      const adestrador = await AdestradorRepository.buscarAdestrador();
      res.status(200).json(adestrador);
    });

    app.get("/adestrador/:id", async (req, res) => {
      const id = req.params.id;
      const valido = await AdestradorValidacao.validarBusca(id);
      if (valido) {
        const adestrador = await AdestradorRepository.buscarAdestradorPorId(id);
        res.status(200).json(adestrador);
      } else {
        res.status(404).json({ message: "Adestrador não encontrado" });
      }
    });

    app.delete("/adestrador/:id", async (req, res) => {
      const id = req.params.id;
      const valido = await AdestradorValidacao.validarBusca(id);
      if (valido) {
        await AdestradorRepository.deletarAdestrador(id);
        res.status(200).json({ message: "Adestrador deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Adestrador não encontrado" });
      }
    });

    app.post("/adestrador", async (req, res) => {
      const body = req.body;
      const emailExistente = await AdestradorRepository.buscarAdestradorPorEmail(body.email);

      if (emailExistente) {
        return res.status(422).json({ message: "Por favor, utilize outro e-mail" });
      }

      try {
        const senhaHash = await bcrypt.hash(body.senha, 10);
        const novoAdestrador = new Adestrador({ ...body, senha: senhaHash });
        await novoAdestrador.save();
        res.status(201).json({ message: 'Adestrador criado com sucesso', id: novoAdestrador._id });
      } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor. Não foi possível criar o adestrador." });
      }
    });

    app.post("/login", async (req, res) => {
      const { email, senha } = req.body;
      const adestrador = await AdestradorRepository.buscarAdestradorPorEmail(email);
  
      if (adestrador) {
        const senhaCorreta = await AdestradorValidacao.compararSenhas(senha, adestrador.senha);
        if (senhaCorreta) {
          res.status(200).json({ success: true, message: "Login bem-sucedido", adestrador });
        } else {
          res.status(401).json({ success: false, message: "Dados inválidos" });
        }
      } else {
        res.status(404).json({ success: false, message: "Usuário não cadastrado" });
      }
    });

    app.post("/resetPassword", async (req, res) => {
      const { email } = req.body;
      const adestrador = await AdestradorRepository.buscarAdestradorPorEmail(email);
  
      if (adestrador) {
        res.status(200).json({ success: true, message: "Email de redefinição de senha enviado com sucesso" });
      } else {
        res.status(404).json({ success: false, message: "E-mail não encontrado no banco de dados" });
      }
    });

    app.get("/adestrador/email", async (req, res) => {
      const { email } = req.query;
      const adestrador = await AdestradorRepository.buscarAdestradorPorEmail(email);
    
      if (adestrador) {
        res.status(200).json(adestrador);
      } else {
        res.status(404).json({ message: "Adestrador não encontrado" });
      }
    });

    app.patch("/adestrador/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const valido = await AdestradorValidacao.validarBusca(id);
      if (!valido) {
        return res.status(404).json({ message: "Adestrador não encontrado" });
      }

      try {
        const adestrador = await Adestrador.findById(id);

        if (!adestrador) {
          return res.status(404).json({ message: "Adestrador não encontrado" });
        }

        if (data.nome) {
          adestrador.nome = data.nome;
        }
        if (data.email) {
          adestrador.email = data.email;
        }
        if (data.senha) {
          const senhaHash = await bcrypt.hash(data.senha, 10);
          adestrador.senha = senhaHash;
        }

        await adestrador.save();

        res.status(200).json({ message: "Adestrador atualizado com sucesso" });
      } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor. Não foi possível atualizar o adestrador." });
      }
    });
  }
}

export default AdestradorController;
