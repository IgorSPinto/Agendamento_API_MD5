import mongoose from "mongoose"

const Agendamento = mongoose.model("Agendamento", {
    duracao: String,//verificar type do atributo
    dia: String, //verificar type do atributo
    hora: String, //verificar type do atributo
    id_cachorro: String,
    id_adestrador: String
})

export default Agendamento;
