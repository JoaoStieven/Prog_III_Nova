/**
 * Deve exportar uma classe chamada Guilda.
Uma guilda deve ter as propriedades: nome e membros (que será uma lista de aventureiros).
Deve ter um método (uma ação) chamado recrutarAventureiro(aventureiro), que adiciona um aventureiro à sua lista de membros. 
Dica: Para um aventureiro ser recrutado, ele já deve existir como um objeto.
Deve ter um método para apresentar a Guilda, em que cada aventureiro deve apresentar-se.
DESAFIO: Faça com que eles apresentem-se em ordem alfabética.

 */

const Aventureiro = require("./Aventureiro");

class Guilda{
    constructor(id, nome){
        this.id = id;
        this.nome = nome;
        this.membros =[]; //lista de Aventureiros
    }
    /**
     * Recruta aventureiro para a Guilda;
     * Impede que o mesmo aventureiro seja adicionado mais de uma vez;
     * Retorna true/false se foi possível adicionar.
     * @param {Aventureiro} aventureiro
     * @returns Boolean 
     */
    recrutarAventureiro(aventureiro){
        if( aventureiro instanceof Aventureiro ){ //retorna verdadeiro se a var é um objeto da Classe Aventureiro
            //verificar se já existe na lista
            for(let i=0; i < this.membros.length;i++){
                if(this.membros[i].nome == aventureiro.nome){
                    console.warn(`Aventureiro ${aventureiro.nome} já faz parte da Guilda`);
                    return false;
                }
            }
            this.membros.push(aventureiro);
            aventureiro.addGuilda(this);
            return true;
        }else{
            console.warn("Objeto não é um Aventureiro para ser inserido à Guilda");
            return false;
        }
    
    }

    apresentar(){
        let strApresenta = `Somos a Guilda ${this.nome}: `;
        this.membros.forEach(e => {
            strApresenta+= e.apresentar()+ '\n';            
        });
        return strApresenta;
    }

}

module.exports = Guilda;