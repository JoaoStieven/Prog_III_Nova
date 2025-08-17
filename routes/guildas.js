var express = require("express");
var router = express.Router();


let GuildaDAO = require("../modelo/GuildaDAO");
let Guilda = require("../classes/Guilda");
let AventureiroDAO = require("../modelo/AventureiroDAO");
let Aventureiro = require("../classes/Aventureiro");
let meuAveDAO = new AventureiroDAO();
let minhaGuilDAO = new GuildaDAO();

let ave1 = new Aventureiro(1, "Aribaldo", "Pipoqueiro");
let ave2 = new Aventureiro(2, "Firmina", "Quentão Maker");
meuAveDAO.add(ave1);
meuAveDAO.add(ave2);

//cria alguns objetos
let guil1 = new Guilda(1, "G1");
let guil2 = new Guilda(2, "G2");
minhaGuilDAO.add(guil1);
minhaGuilDAO.add(guil2);


/*Rota que retorna todos as guildas, em json */
router.get("/", function (req, res) {
  const guildas = minhaGuilDAO.getAll().map(g => ({
    id: g.id,
    nome: g.nome,
    membros: g.membros.map(m => ({
      id: m.id,
      nome: m.nome,
    }))
  }));
  res.json(guildas);
});

/*Rota que cria uma guilda*/
router.post("/", function (req, res) {
  try {
    //pegar os dados vindos da req (Parser)
    let dados = req.body;
    //verificar dados
    if (!dados.id || !dados.nome) {
      res.status(400).json({ mensagem: "Os campos não estão completos!" });
    }
    //criar uma guilda com os dados
    let guilda = new Guilda(dados.id, dados.nome);
    //persistir os dados
    minhaGuilDAO.add(guilda);
    //retornar uma resposta
    res.status(201).json({ mensagem: "Guilda criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao processar requisição." });
  }
});


/*rota que retorna a guilda pelo id*/
router.get("/:id", function (req, res) {
  try {
    let id = req.params.id;
    const guilda = minhaGuilDAO.get(id);

    if (guilda) {
      const retorno = {
        id: guilda.id,
        nome: guilda.nome,
        membros: guilda.membros.map(m => ({
          id: m.id,
          nome: m.nome,
        }))
      };
      res.status(200).json(retorno);
    } else {
      res.status(404).json({ mensagem: "Guilda não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao processar requisição" });
  }
});




/*Rota para atualizar o nome de uma guilda*/
router.put("/:id", function (req, res) {
  try {
    const { id } = req.params;
    let dados = req.body;

    let guildaAtualizada = minhaGuilDAO.update(id, dados);

    if (guildaAtualizada == null) {
      res.status(404).json({ mensagem: "Guilda não encontrada." });
    } else {
      const retorno = {
        id: guildaAtualizada.id,
        nome: guildaAtualizada.nome,
        membros: guildaAtualizada.membros.map(m => ({
          id: m.id,
          nome: m.nome,
        }))
      };
      res.json({
        mensagem: "Atualização do objeto bem-sucedida",
        guilda: retorno,
      });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao processar update" });
  }
});


/* Rota para deletar uma guilda pelo ID */
router.delete("/:id", function (req, res) {
  try {
    let id = req.params.id;
    let queries = req.query.varQuery;
    console.log(`Esta é a query que veio na requisição: ${queries}`);

    //verificar se o objeto existe
    if (minhaGuilDAO._procuraGuilda(id)) {
      //faz a exclusão
      let retorno = minhaGuilDAO.delete(id);
      if (retorno != null) {
        res.status(200).json(JSON.stringify(retorno))
      } else {
        //se deu problema
        res.status(500).json({ mensagem: "Erro ao realizar a exclusão" });
      }
    } else {
      //se objeto não for encontrado (não existir)
      res.status(200);
    }
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao processar delete. " + erro });
  }

});


/* Rota para recrutar um aventureiro*/
router.post("/:id/membros", function (req, res) {
  try {
    const idGuilda = req.params.id;
    const aventureiroId = Number(req.body.aventureiroId);

    // Buscar a guilda
    const guilda = minhaGuilDAO.get(idGuilda);
    if (!guilda) {
      return res.status(404).json({ mensagem: "Guilda não encontrada." });
    }

    // Buscar o aventureiro
    const aventureiro = meuAveDAO.get(aventureiroId);
    if (!aventureiro) {
      return res.status(404).json({ mensagem: "Aventureiro não encontrado." });
    }

    // Recrutar o aventureiro
    const sucesso = guilda.recrutarAventureiro(aventureiro);
    if (sucesso) {
      res.status(201).json({ mensagem: "Aventureiro recrutado com sucesso!" });
    } else {
      res.status(400).json({ mensagem: "Aventureiro já faz parte da guilda." });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao processar requisição." });
  }
});


module.exports = router;