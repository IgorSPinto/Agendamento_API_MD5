import mongoose from "mongoose";

const Agendamento = mongoose.model("Agendamento", {
    cliente: String,
    pet: String, 
    data: String,
    duracao: String
})

export default Agendamento;
