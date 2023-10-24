import ValidacaoServices from "./ValidacaoServices.js";

class AdestradorValidacao extends ValidacaoServices {
  static validaNome(nome) {
    return typeof nome === "string" && nome.trim() !== "";
  }

  static validaEmail(email) {
    // Adicione a validação do formato do email, se necessário
    return typeof email === "string";
  }

  static validaSenha(senha) {
    return typeof senha === "string" && senha.length >= 8; // Ajuste conforme seus critérios de complexidade
  }

  static validaCamposAdestrador(nome, email, senha) {
    if (
      this.validaNome(nome) &&
      this.validaEmail(email) &&
      this.validaSenha(senha)
    ) {
      return true;
    } else {
      throw new Error("Campos inválidos");
    }
  }
}

export default AdestradorValidacao;
