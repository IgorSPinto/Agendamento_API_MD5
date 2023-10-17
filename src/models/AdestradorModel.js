import mongoose from "mongoose"

const Adestrador = mongoose.model("Adestrador", {
    nome: String,
    formacao: String,
    id_agendamento: String,
    id_endereco: String,
    email: String,
    senha: String
})

export default Adestrador;
