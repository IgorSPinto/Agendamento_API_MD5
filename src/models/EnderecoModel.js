import mongoose from "mongoose"

const Endereco = mongoose.model("Endereco", {
    cep: String, //verrificar tyde do atributo
    numero: String, //verrificar tyde do atributo
    complemento: String
})

export default Endereco;