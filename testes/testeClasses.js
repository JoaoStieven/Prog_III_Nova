const Aventureiro = require('../classes/Aventureiro');
const Guilda = require('../classes/Guilda');

//fazer importação do módulo com mais de uma função
//Importando todo o módulo:
const QuadroDeMissoes = require('../funcoes/QuadroDeMissoes');
/*usando uma função do módulo
*QuadroDeMissoes.avaliarPoderDoGrupo(umaGuilda);
*QuadroDeMissoes.sugerirMissaoParaGuilda(umaGuilda);
*/

//importando somente as funções necessárias, com 'binding':
const {avaliarPoderDoGrupo, sugerirMissaoParaGuilda} = require('../funcoes/QuadroDeMissoes');

let meuAve = new Aventureiro(1,"Aventureiro da Prog III", "Programador");
let meuAve2 = new Aventureiro(2, "Outro Aventureiro da Prog III", "Designer");

console.log(meuAve.apresentar());

let minhaGuilda = new Guilda('Terceirão EMI-INFO');
minhaGuilda.recrutarAventureiro(meuAve);
minhaGuilda.recrutarAventureiro(meuAve2);

console.log(minhaGuilda.apresentar());

const poder = avaliarPoderDoGrupo(minhaGuilda);
console.log(`O poder da guilda ${minhaGuilda.nome} é: ${poder}` );