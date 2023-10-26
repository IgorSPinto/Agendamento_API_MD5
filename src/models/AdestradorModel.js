/* import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AdestradorValidacao from '../services/AdestradorValidacao.js';

const adestradorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
});

adestradorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '7d',
  });
  return token;
};

adestradorSchema.pre('save', async function (next) {
  if (this.isModified('senha')) {
    // Verificar se a senha atende às validações de AdestradorValidacao
    if (!AdestradorValidacao.validaSenha(this.senha)) {
      throw new Error('Senha inválida');
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
  }
  next();
});

const AdestradorModel = mongoose.model('Adestrador', adestradorSchema);

// Exporte o modelo para torná-lo disponível em outros módulos
export default AdestradorModel;

 */

import mongoose from "mongoose";

const Adestrador = mongoose.model("Adestrador", {
    nome: String,
    email: String, 
    senha: String, 
})

export default Adestrador;