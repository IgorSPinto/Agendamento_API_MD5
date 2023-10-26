import ValidacaoServices from "./ValidacaoServices.js";

class EnderecoValidacao extends ValidacaoServices {

    /**
         * Método para validação de CEP
         * @param {string} cep
         * @returns {boolean}
         * 
         */

   static validaCEP(cep) {
    if (cep !== '') {
        return true; // Número válido 
    }
    }

    /**
 * Método para validação de número
 * @param {string} numero - O número a ser validado.
 * @returns {boolean} - True se o número não estiver vazio, false caso contrário.
 */
static validaNumero(numero) {
    if (numero !== '') {
        return true; // Número válido 
    }
}


/**
         * Método para validação do complemento
         * @param {string} complemento
         * @returns {boolean}
         * 
         */

static validaComplemento(complemento) {
    if (complemento !== '') {
        return true; // complemento válido
    }
    
}
    /**
         * Método para validação de todos os campos fornecidos pelo cliente na entidade cliente
         * @param {string} cep 
         * @param {string} numero 
         * @param {string} complemento 
         * 
         */

    static validaCamposEndereco(cep, numero, complemento) {
        const isValid = this.validaCEP(cep) && this.validaNumero(numero) && this.validaComplemento(complemento)
        if (!isValid) {
            throw new Error("Campos invalidos")
        }
    }
    
}

export default EnderecoValidacao;



