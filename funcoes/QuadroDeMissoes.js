/**
 * Módulo QuadroDeMissoes.js (Um Conjunto de Funções):


Este módulo é diferente! Ele não será uma classe. 
Ele será como uma "caixa de ferramentas" que exporta funções úteis.
Deve conter uma função avaliarPoderDoGrupo(guilda) que recebe uma guilda 
como parâmetro e calcula a soma dos níveis de todos os seus membros.

Deve conter uma função sugerirMissaoParaGuilda(guilda) que calcula 
o poder do grupo e, com base nisso, sugere uma missão da tabela abaixo.

 */

const Guilda = require("../classes/Guilda");

/**
 * Retorna o somatório dos níves dos membros do grupo.
 * 
 * @param {Guilda} guilda 
 */
function avaliarPoderDoGrupo(guilda){
    if(!guilda instanceof Guilda){
        console.warn('Guilda inválida');
        return null;
    }
    let poder =0;
    guilda.membros.forEach( membro =>{
        poder += membro.nivel;
    });
    return poder;
}

function sugerirMissaoParaGuilda(guilda){

}

module.exports = {avaliarPoderDoGrupo, sugerirMissaoParaGuilda};