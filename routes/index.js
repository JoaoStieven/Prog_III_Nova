var express = require("express");
var router = express.Router();

let AventureiroDAO = require("../modelo/AventureiroDAO");
let Aventureiro = require("../classes/Aventureiro");

let meuAveDAO = new AventureiroDAO();
//cria alguns objetos
let ave1 = new Aventureiro(1, "Aribaldo", "Pipoqueiro");
let ave2 = new Aventureiro(2, "Firmina", "Quentão Maker");
meuAveDAO.add(ave1);
meuAveDAO.add(ave2);

router.get("/dd", function (req, res) {
  let resposta = {};
  resposta.msg = "Oi, Cliente!";
  resposta.horaDaResposta = Date.now().toLocaleString("pt-br");
  res.json(resposta); //deu td ok e aqui estão os dados em json
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile("aventureiro.html", { root: "public" });
});

router.get("/pagina", function (req, res) {
  let html = "<HTML><HEADER>SITE DE EXEMPLO</HEADER></HTML>";
  res.contentType = "text/html"; //padrão MIME/TYPE
  res.send(html);
});

/*Rota que retorna todos os aventureiros, em json */
router.get("/aventureiro", function (req, res) {
  const aventureiros = meuAveDAO.getAll();
  res.json(aventureiros);
});

/*rota que retorna o aventureiro pelo id*/
router.get("/aventureiro/:id", function(req, res){
  try{
    let id = req.params.id;
    let retorno = meuAveDAO.get(id);
    if(retorno != null){
      res.status(200).json(retorno);
    }else{
      //significa que não encontrou objeto com id
      res.status(404).json();
    }
  }catch (error){
    res.status(500).json({mensagem: "Erro ao processar requisição"});
  }

});

/*Rota que cria um aventureiro*/
router.post("/aventureiro", function (req, res) {
  const { id, nome, classe } = req.body; 
  
  const aventureiro = new Aventureiro(id, nome, classe);

  meuAveDAO.add(aventureiro);

  res.status(200).json(aventureiro);
});

/*Rota para atualizar um aventureiro*/
router.put("/aventureiro/:id", function (req, res) {
  console.log()
});

/* Rota para deletar um aventureiro pelo ID 
:id --> vai capturar o dado da requisição para uma variavel de parametro. (params)
*/
router.delete("/aventureiro/:id", function (req, res) {
  meuAveDAO.delete(req.params.id);

  res.sendStatus(200);
});

module.exports = router;
