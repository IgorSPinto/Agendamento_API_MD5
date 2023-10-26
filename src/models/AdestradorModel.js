import mongoose from "mongoose";

const adestradorSchema = new mongoose.Schema({
    nome: String,
    email: {
        type: String,
        unique: true, 
    },
    senha: String,
});

const Adestrador = mongoose.model("Adestrador", adestradorSchema);

export default Adestrador;