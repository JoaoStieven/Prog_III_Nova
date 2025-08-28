var baseUrl = "http://localhost:3000";

try {
  //capturar botão
  let btnGetAventueiro = document.querySelector("#btn-getAventureiro");
  //adicionar event handler
  btnGetAventueiro.addEventListener("click", getAventureiros);
} catch (error) {
  console.log("Erro na criação de evento:" + error);
}

async function getAventureiros(event) {
  try {
    let path = "/aventureiro";
    let response =  await fetch(baseUrl + path);
    let aventureiros = await response.json();
    console.log(JSON.stringify(aventureiros));
    renderizaAventureiros(aventureiros);


  } catch (error) {
    console.log(`Erro getAventureiros: ${error}`);
  }
}

/**Renderiza no HTML todos os aventureiros obtidos
 * @param aventureiros JSON de aventureiros
 */
function renderizaAventureiros(aventureiros){
    //para cada aventueiro
    let sectionAventureiro = document.querySelector('#section-aventureiro');
    aventureiros.forEach(a => {
        let card = criaCardAventueiro(a);
        let divCard = document.createElement('div');
        divCard.id = "cardAventureiro" + a.id;
        divCard.innerHTML = card;
        sectionAventureiro.appendChild(divCard);
    });
        //criar um card
    //para cada card
        //adicionar no elemento html
}

function criaCardAventueiro(aventueiro){
    /**"id":1,"nome":"Aribaldo","classe":"Pipoqueiro","nivel":1 */
    let card = `<div class=card-aventureiro> 
     <p>${aventueiro.id} - ${aventueiro.nome} Classe: ${aventueiro.classe} </p>
     </div> `; 

     return card;
}