import Repository from "../repository/Repository.js";

class ValidacaoServices {
    static async exists(MongooseModel, id){
        try{
            const response = await Repository.findById(MongooseModel, id)
            if(response == null){
                throw new error()
            }
            return true
        }catch(error){
            return false 
        }
    }

   /* Metodos cliente */
    static validarTelefone(telefone){
        return telefone.length > 2 && typeof(telefone) == "string"
    }

    static  validarNome(nome){
        return nome.length > 2 && typeof(nome) == "string"
    }

    static  validarEmail(email){
        return email.length > 2 && typeof(email) == "string"
    }


    /* Metodo de validação da senha do Adestrador */
    static  validarSenha(senha){
        return senha.length > 2 && typeof(senha) == "string"
    }

    /* Metodos Agendamento */
    static validarCep(cep){
        return cep.length == 8 && !isNaN(cep)
    }

    static  validarRua(rua){
        return rua.length > 2 && typeof(rua) == "string"
    }

    static validarNumeroRua(numero){
        return numero.length > 0 && typeof(numero) == "string"
    }

    static validarCliente(cliente){
        return cliente.length > 0 && typeof(cliente) == "string"
    }

    static validarPet(pet){
        return pet.length > 0 && typeof(pet) == "string"
    }

    static validarData(data){
        return data.length > 0 && typeof(data) == "string"
    }

    static validarDuracao(duracao){
        return duracao.length > 0 && typeof(duracao) == "string"
    }
}

export default ValidacaoServices;
