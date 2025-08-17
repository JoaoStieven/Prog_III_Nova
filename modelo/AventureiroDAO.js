/**
 * Classe Data Access Object (DAO) que faz o gestão
 * de dados entre os objetos e a sua persistência
 * (armazenamento);
 *
 * Faz operações de CRUD;
 * - Create -- add;
 * - Retrieve -- get;
 * - Update -- update;
 * - Delete - delete;
 * *
 * */

//Como não temos AINDA um banco de dados, vamos armazenar tudo em vetores;

const Aventureiro = require("../classes/Aventureiro");

class AventureiroDAO {
  constructor() {
    this.aventureirosBD = [];
  }

  get(id) {
    //procurar por aventureiro com id == id
    return this._procuraAventureiro(id);
  }
  getAll() {
    return this.aventureirosBD;
  }

  add(aventureiro) {
    if (aventureiro instanceof Aventureiro) {
      const a = this._procuraAventureiro(aventureiro.id);
      if (a == null) {
        //se == null, não encontrou com mesmo id, então pode adicionar
        this.aventureirosBD.push(aventureiro);
        return aventureiro;
      }
    }
    return null;
  }

  //quando um método da classe é somente para uso interno dela,
  //conveciona-se usar _ no nome do método,
  //pois deveria ser um método PRIVADO
  _procuraAventureiro(id) {
    for (let i = 0; i < this.aventureirosBD.length; i++) {
      if (this.aventureirosBD[i].id == id) {
        return this.aventureirosBD[i];
      }
    }
    return null;
  }
  update(id, novosDados) {
    let dadoAtual = this._procuraAventureiro(id);
    if (dadoAtual == null) {
      return null;
    }

    if (novosDados.nome != undefined && novosDados.nome != null) {
      dadoAtual.nome = novosDados.nome;
    }
    if (novosDados.classe != undefined && novosDados.classe != null) {
      dadoAtual.classe = novosDados.classe;
    }
    if(novosDados.nivel !=undefined && novosDados.nivel != null){
      dadoAtual.nivel = novosDados.nivel;
    }

    return dadoAtual;
  }

  delete(id) {
    let a = this._procuraAventureiro(id);
    if (a == null) {
      return null;
    }
    //const i = this.aventureirosBD.findIndex((a) => a.id == id  );
    const i = this._findIndex(id);
    this.aventureirosBD.splice(i, 1);
    return a;
  }
  _findIndex(id) {
    for (let i = 0; i < this.aventureirosBD.length; i++) {
      if (this.aventureirosBD[i].id == id) {
        return i;
      }
    }
  }
}

module.exports = AventureiroDAO;
