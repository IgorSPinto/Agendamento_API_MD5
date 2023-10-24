import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AdestradorValidacao from '../services/AdestradorValidacao.js';

const adestradorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

adestradorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '7d',
  });
  return token;
};

adestradorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Verificar se a senha atende às validações de AdestradorValidacao
    if (!AdestradorValidacao.validaSenha(this.password)) {
      throw new Error('Senha inválida');
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const AdestradorModel = mongoose.model('Adestrador', adestradorSchema);

export default AdestradorModel;