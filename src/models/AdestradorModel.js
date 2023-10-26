import mongoose from "mongoose";

const Adestrador = mongoose.model("Adestrador", {
    nome: String,
    email: String, 
    senha: String, 
})

export default Adestrador;