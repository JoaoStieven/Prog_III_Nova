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
  res.render("index", { title: "ESTE É O NOSSO SITE" });
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
  try {
    //pegar os dados vindos da req (Parser)
    let dados = req.body;
    //verificar dados
    if (!dados.id || !dados.nome || !dados.classe) {
      res.status(400).json({ mensagem: "Os campos não estão completos!" });
    }
    //criar um aventureiro com os dados
    let aventureiro = new Aventureiro(dados.id, dados.nome, dados.classe);
    //persistir os dados
    meuAveDAO.add(aventureiro);
    //retornar uma resposta
    res.status(201).json({ mensagem: "Aventureiro criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao processar requisição." });
  }
});

/*Rota para atualizar um aventureiro*/
router.put("/aventureiro/:id", function (req, res) {
  try {
    const { id } = req.params;
    let dados = req.body;

    let aventureiroAtualizado = meuAveDAO.update(id, dados);

    if (aventureiroAtualizado == null) {
      res.status(404).json({ mensagem: "Aventureiro não encontrado." });
    } else {
      res.json({
        mensagem: "Atualização do objeto bem-sucedida",
        aventureiro: aventureiroAtualizado,
      });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao processar update" });
  }
});

/* Rota para deletar um aventureiro pelo ID 
:id --> vai capturar o dado da requisição para uma variavel de parametro. (params)
*/
router.delete("/aventureiro/:id", function (req, res) {
  try{
    let id = req.params.id; 
    let queries = req.query.varQuery;
    console.log(`Esta é a query que veio na requisição: ${queries}`);

    //verificar se o objeto existe
    if(meuAveDAO._procuraAventureiro(id)){
      //faz a exclusão
      let retorno = meuAveDAO.delete(id);
      if(retorno != null){
        res.status(200).json(JSON.stringify(retorno))
      }else{
        //se deu problema
        res.status(500).json({mensagem: "Erro ao realizar a exclusão"});
      }
    }else{
      //se objeto não for encontrado (não existir)
      res.status(404);
    }
  }catch(erro){
    res.status(500).json({mensagem: "Erro ao processar delete. " + erro});
  }
  
});

module.exports = router;
