import mongoose from "mongoose"

const Cachorro = mongoose.model("Cachorro", {
    nome: String,
    raca: String, 
    cor: String, 
    sexo: String,
    peso: String //verificar type do atributo
})

export default Cachorro;

