import mongoose from "mongoose"

const Cliente = mongoose.model("Cliente", {
    nome: String,
    email: String, 
    telefone: String, 
    id_endereco: String,
})

export default Cliente;
