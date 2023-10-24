import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AdestradorValidacao from './AdestradorValidacao';

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
    AdestradorValidacao.validaSenha(this.password);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Adestrador = mongoose.model('Adestrador', adestradorSchema);

module.exports = Adestrador;