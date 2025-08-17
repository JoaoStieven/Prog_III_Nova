# Guia do Mestre de Rotas: Criando Caminhos para Aventureiros

Olá, jovem programador! Bem-vindo ao seu guia para desbravar as rotas de uma aplicação Express.js. Aqui, você vai entender como sua aplicação sabe o que fazer quando um usuário acessa uma URL e aprenderá a criar novos caminhos para gerenciar seus Aventureiros.

## Parte 1: A Rota Existente - O Mapa do Tesouro (`GET /aventureiro`)

Antes de criar novas rotas, vamos entender como a rota que lista todos os aventureiros funciona. É como ler um mapa antes de começar a jornada!

**A Conexão Inicial em `app.js`**

Tudo começa no arquivo `app.js`. Pense nele como o "salão principal" da sua guilda. A linha abaixo é crucial:

```javascript
// Em app.js
app.use('/', indexRouter);
```

Isso diz ao Express: "Para qualquer caminho que comece com `/`, use as rotas definidas no arquivo `indexRouter` (que é o `routes/index.js`)".

**A Definição da Rota em `routes/index.js`**

Agora, vamos para o arquivo `routes/index.js`. É aqui que o mapa do tesouro (`GET /aventureiro`) está desenhado:

```javascript
// Em routes/index.js
router.get('/aventureiro', function(req, res){
  const aventureiros = meuAveDAO.getAll();
  res.json(aventureiros);
});
```

Vamos decifrar este feitiço:

1.  `router.get(...)`: Estamos dizendo que esta rota responde ao método **GET** do HTTP. GET é usado para **buscar** informações.
2.  `'/aventureiro'`: Este é o caminho (ou URI). Como ele está no `indexRouter` montado em `/`, o caminho completo para o usuário é `http://localhost:3000/aventureiro`.
3.  `function(req, res){ ... }`: Esta é a "ação" da rota. Ela sempre recebe dois objetos mágicos:
    *   `req` (Requisição): Carrega tudo que o cliente enviou para nós (dados, cabeçalhos, etc.).
    *   `res` (Resposta): É o que usamos para enviar uma resposta de volta para o cliente.
4.  `meuAveDAO.getAll()`: Aqui, estamos usando nosso `AventureiroDAO` para buscar todos os aventureiros do "banco de dados".
5.  `res.json(aventureiros)`: Com a lista de aventureiros em mãos, usamos `res.json()` para enviá-la de volta ao cliente no formato JSON, que é perfeito para APIs!

## Parte 2: Sua Missão - Crie as Rotas de Gerenciamento!

Agora é sua vez de brilhar! Sua missão é criar as rotas para Adicionar, Atualizar e Remover aventureiros. Não vou te dar o código pronto, mas vou te dar todas as dicas que você precisa.

### Missão 1: Recrutar um Novo Aventureiro (`POST`)

Para criar um novo aventureiro, o cliente precisa nos enviar os dados dele (id, nome, especialidade).

-   **Método HTTP:** Para **criar** um novo recurso, usamos o método `POST`.
-   **Caminho:** Pode ser o mesmo de antes: `/aventureiro`.
-   **Como pegar os dados?** Os dados virão no "corpo" (body) da requisição. O Express já prepara isso para você no objeto `req.body`. Você pode acessar o nome com `req.body.nome`, por exemplo.
-   **Sua Tarefa:**
    1.  Crie uma rota com `router.post('/aventureiro', ...)`.
    2.  Dentro da função, pegue os dados do `req.body`.
    3.  Crie uma nova instância da sua classe `Aventureiro` com esses dados.
    4.  Use o `meuAveDAO.add()` para adicionar o novo aventureiro.
    5.  Envie uma resposta de sucesso! Uma boa prática é usar `res.status(201).json({ message: 'Aventureiro criado!' })`. O status `201` significa "Created".

### Missão 2: Promover um Aventureiro (`PUT`)

Para atualizar um aventureiro, precisamos saber **qual** aventureiro atualizar e quais são os **novos dados**.

-   **Método HTTP:** Para **atualizar** um recurso existente, usamos o `PUT`.
-   **Caminho:** Precisamos de um identificador. Que tal `'/aventureiro/:id'`? Esse `:id` é um parâmetro dinâmico!
-   **Como pegar o ID?** O Express coloca os parâmetros da URL no objeto `req.params`. Você pode pegar o ID com `req.params.id`.
-   **Como pegar os novos dados?** Igual na criação: `req.body`.
-   **Sua Tarefa:**
    1.  Crie uma rota com `router.put('/aventureiro/:id', ...)`.
    2.  Pegue o `id` de `req.params` e os novos dados de `req.body`.
    3.  Use o método de atualização do seu `meuAveDAO`.
    4.  **Pense nisto:** E se o ID não existir? Você deve enviar uma resposta de erro. O status `404` (Not Found) é perfeito para isso: `res.status(404).json({ message: 'Aventureiro não encontrado.' })`.

### Missão 3: Dispensar um Aventureiro (`DELETE`)

Para remover um aventureiro, só precisamos saber o ID dele.

-   **Método HTTP:** Para **remover**, o nome já diz tudo: `DELETE`.
-   **Caminho:** Assim como na atualização, use `'/aventureiro/:id'`.
-   **Como pegar o ID?** Você já sabe: `req.params.id`.
-   **Sua Tarefa:**
    1.  Crie uma rota com `router.delete('/aventureiro/:id', ...)`.
    2.  Pegue o `id` de `req.params`.
    3.  Use o método de remoção do seu `meuAveDAO`.
    4.  Lembre-se de tratar o caso em que o aventureiro não existe (erro 404).

---

Com estas diretrizes, você tem tudo para completar sua missão. Adicione estas novas rotas ao seu arquivo `routes/index.js`. Boa sorte, e que seus códigos sejam sempre limpos e funcionais!
