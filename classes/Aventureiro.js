/**
 * Deve exportar uma classe chamada Aventureiro.
Um aventureiro deve ter as seguintes propriedades (informações): nome, classe (ex: "Guerreiro", "Mago") e nivel.
Um Aventureiro pode pertencer a mais de uma Guilda;
Deve ter um método para saudação, onde o aventureiro apresenta-se de acordo com seu nome, classe, nível e guildas que pertence.

 */

class Aventureiro {
  constructor(id, nome, classe) {
    this.id = id;
    this.nome = nome;
    this.classe = classe;
    this.nivel = 1; //this indica que a variável é um atributo de um objeto da classe
    this.guildas = []; //
  }

  addGuilda(guilda){
    this.guildas.push(guilda);
  }
  apresentar() {
    let apresentacao = `Saudações! Sou ${this.nome}, classe ${this.classe}, nível ${this.nivel}.`;
    if (this.guildas.length > 0) {
      let apresentaGuildas = " Pertenço às Guildas: ";
      this.guildas.forEach((e) => {
        //para cada elemento e, dentro de guilda, faça
        apresentaGuildas += `${e.nome} `;
      });
      apresentacao += apresentaGuildas;
    }else{
        apresentacao += ' Não pertenço a nenhuma Guilda.';
    }
    return apresentacao;
  }
}

module.exports = Aventureiro;