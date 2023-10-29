import mongoose from "mongoose";

const adestrador = new mongoose.Schema({
    nome: String,
    email: {
        type: String,
        unique: true, 
    },
    senha: String,
});

const Adestrador = mongoose.model("Adestrador", adestrador);

export default Adestrador;