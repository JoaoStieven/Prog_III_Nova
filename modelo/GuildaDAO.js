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
 * */

const Guilda = require("../classes/Guilda");

class GuildaDAO {
  constructor() {
    this.guildasBD = [];
  }

  get(id) {
    //procurar por guilda com id == id
    return this._procuraGuilda(id);
  }
  getAll() {
    return this.guildasBD;
  }

  //Um método para adicionar uma nova guilda à lista.
  add(guilda) {
    if (guilda instanceof Guilda) {
      const g = this._procuraGuilda(guilda.id);
      if (g == null) {
        //se == null, não encontrou com mesmo id, então pode adicionar
        this.guildasBD.push(guilda);
        return guilda;
      }
    }
    return null;
  }

  //quando um método da classe é somente para uso interno dela,
  //conveciona-se usar _ no nome do método,
  //pois deveria ser um método PRIVADO
  _procuraGuilda(id) {
    for (let i = 0; i < this.guildasBD.length; i++) {
      if (this.guildasBD[i].id == id) {
        return this.guildasBD[i];
      }
    }
    return null;
  }


  update(id, novosDados) {
    let dadoAtual = this._procuraGuilda(id);
    if (dadoAtual == null) {
      return null;
    }

    if (novosDados.nome != undefined && novosDados.nome != null) {
      dadoAtual.nome = novosDados.nome;
    }
    return dadoAtual;
  }

  delete(id) {
    let g = this._procuraGuilda(id);
    if (g == null) {
      return null;
    }
    const i = this._findIndex(id);
    this.guildasBD.splice(i, 1);
    return g;
  }


  _findIndex(id) {
    for (let i = 0; i < this.guildasBD.length; i++) {
      if (this.guildasBD[i].id == id) {
        return i;
      }
    }
  }
}

module.exports = GuildaDAO;
