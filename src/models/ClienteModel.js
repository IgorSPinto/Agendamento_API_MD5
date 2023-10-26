import mongoose from "mongoose";

const Cliente = mongoose.model("Cliente", {
    nome: String,
    email: String, 
    telefone: String, 
})

export default Cliente;
