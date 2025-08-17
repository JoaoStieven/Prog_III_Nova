

//instanciação do AventureiroDAO
//Testar operações

const Aventureiro = require('../classes/Aventureiro');
const AventureiroDAO = require('../modelo/AventureiroDAO');

let aventDAO = new AventureiroDAO();

let meuAve = new Aventureiro(1, "Meu aventureiro", "Mago");
aventDAO.add(meuAve);
let outroAve = new Aventureiro(2, "Novo Nome", "Vampiro");
let resultadoUp = aventDAO.update(1, outroAve);
let a = aventDAO.get(1);
let resultadoDel = aventDAO.delete(1);
outroAve.nome ="Outro Aventureiro";
aventDAO.add(outroAve);
let resultAll = aventDAO.getAll();
