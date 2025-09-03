var baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  let path = "/aventureiro";
  let response = await fetch(baseUrl + path);
  let aventureiros = await response.json();

  const nextID = aventureiros.length + 1;
  const adventurerID = document.getElementById("id");

  adventurerID.value = nextID;
});

try {
  //capturar botão
  let btnGetAventureiro = document.querySelector("#btn-getAventureiro");
  //adicionar event handler
  btnGetAventureiro.addEventListener("click", renderizaAventureiros);
} catch (error) {
  console.log("Erro na criação de evento:" + error);
}

try {
  const btnSubmitForm = document.getElementById("form-aventureiro");

  btnSubmitForm.addEventListener("submit", adicionarAventureiro);
} catch (error) {
  console.log("Erro na criação de evento:" + error);
};

/**
 * 
 * @param {*} event
 * @returns { Promise<any[]> }
 */
async function getAventureiros(event) {
  try {
    let path = "/aventureiro";
    let response = await fetch(baseUrl + path);
    let aventureiros = await response.json();
    
    return aventureiros;
  } catch (error) {
    console.log(`Erro getAventureiros: ${error}`);
  }
}

/**Renderiza no HTML todos os aventureiros obtidos
 */
async function renderizaAventureiros() {
  const adventurers = await getAventureiros();
  const adventurerList = document.getElementById("lista-aventureiros");

  adventurerList.innerHTML = "";

  adventurers.forEach(a => {
    let card = criaCardAventueiro(a);

    let adventurerItem = document.createElement('li');
    adventurerItem.id = "cardAventureiro" + a.id;
    adventurerItem.innerHTML = card;
    adventurerItem.dataset["id"] = a.id;

    let btnAlterar = document.createElement('input');
    btnAlterar.setAttribute('type', 'button');
    btnAlterar.setAttribute('value', 'Alterar');

    let btnExcluir = document.createElement('input');
    btnExcluir.setAttribute('type', 'button');
    btnExcluir.setAttribute('value', 'Excluir');

    btnAlterar.addEventListener('click', alterar);
    btnExcluir.addEventListener('click', excluir);

    adventurerItem.appendChild(btnAlterar);
    adventurerItem.appendChild(btnExcluir);

    adventurerList.appendChild(adventurerItem);
  });
}

/**
 * @this { HTMLButtonElement }
 */
async function alterar(){
  const path = `${baseUrl}/aventureiro/${this.parentElement.dataset.id}`;
  const card = this.parentElement.children[0];

  const adventurerID = document.getElementById("id");
  const adventurerName = document.getElementById("nome");
  const adventurerClass = document.getElementById("classe");

  const contentStr = card.children[0].innerHTML;

  for(const [match, content] of contentStr.match(/^(\d+) *- *Nome: *(.+) *- *Classe: *(.+)/).entries()){
    if(!match) continue;
    switch (match){
      case 1: adventurerID.value = content.trim();
      case 2: adventurerName.value = content.trim();
      case 3: adventurerClass.value = content.trim();
    };
  };

  const formData = new FormData(document.getElementById("form-aventureiro"));

  const obj = {};
  for (const [name, value] of formData.entries()){
    obj[name] = value;
  };

  console.log(obj)

  // await fetch(path, { method: "PUT", body: JSON.stringify() });
  // await renderizaAventureiros();
}

/**
 * @this { HTMLButtonElement }
 */
async function excluir(){
  const path = `${baseUrl}/aventureiro/${this.parentElement.dataset.id}`;

  await fetch(path, { method: "DELETE" });

  await renderizaAventureiros();
}

/**
 * @this {HTMLFormElement}
 * @param {SubmitEvent} ev
 */
async function adicionarAventureiro(ev){
  ev.preventDefault();

  const formData = new FormData(this);

  const obj = {};
  for (const [name, value] of formData.entries()){
    obj[name] = value;
  };

  document.getElementById("id").value++;

  await fetch(this.action, { method: "POST", body: JSON.stringify(obj), headers: { "Content-Type": "application/json" } });
  await renderizaAventureiros();
};

function criaCardAventueiro(aventureiro) {
  const card = `<div class='card-aventureiro'>
    <p>${aventureiro.id} - Nome: ${aventureiro.nome} - Classe: ${aventureiro.classe}</p>
  </div>`

  return card;
}