# Atividade: O Mestre das Guildas

Parabéns, aventureiro do código! Você dominou as rotas para os Aventureiros. Agora, uma nova responsabilidade recai sobre seus ombros: gerenciar as Guildas! Uma guilda é mais do que apenas um nome; ela é uma coleção de bravos aventureiros. Sua missão é construir a estrutura para criar, listar e, o mais importante, recrutar membros para essas guildas.

## Parte 1: A Fundação - Criando o `GuildaDAO`

Assim como os Aventureiros precisavam de um "cartório" (`AventureiroDAO`) para gerenciar seus registros, as Guildas também precisam. Este será o seu `GuildaDAO`, o objeto responsável por persistir (no nosso caso, em memória) todas as informações das guildas.

**Sua Tarefa:**

1.  **Crie o Arquivo:** No diretório `modelo/`, crie um novo arquivo chamado `GuildaDAO.js`.

2.  **Estruture a Classe:** Dentro deste arquivo, crie uma classe `GuildaDAO`. Ela terá uma lista interna para armazenar as guildas, assim como o `AventureiroDAO`.

3.  **Pense nos Métodos:** Quais ações um `GuildaDAO` precisa realizar? Considere as operações básicas de um CRUD (Create, Read, Update, Delete):
    *   Um método para **adicionar** uma nova guilda à lista.
    *   Um método para **buscar uma guilda específica** pelo seu nome ou por um ID (você decide qual abordagem usar!).
    *   Um método para **listar todas** as guildas existentes.
    *   Um método para **atualizar** os dados de uma guilda (como mudar seu nome).
    *   Um método para **remover** uma guilda.

**Dica de Mestre:** Lembre-se que a classe `Guilda` já tem um método `recrutarAventureiro(aventureiro)`. O seu DAO não precisa recriar essa lógica, mas ele será fundamental para *orquestrar* o recrutamento mais tarde!

## Parte 2: Abrindo as Portas da Guilda - As Rotas

Com o `GuildaDAO` pronto, é hora de permitir que o mundo exterior interaja com suas guildas através de uma API.

**Sua Tarefa:**

1.  **Crie um Novo Arquivo de Rotas:** No diretório `routes/`, crie um arquivo chamado `guildas.js`. Ele será o responsável por todos os endpoints relacionados a guildas.

2.  **Configure o `app.js`:** Não se esqueça de ir ao `app.js` e "montar" seu novo arquivo de rotas. Você precisará de duas linhas:
    ```javascript
    // Perto do topo, com os outros 'requires'
    var guildasRouter = require('./routes/guildas');

    // Mais abaixo, com os outros 'app.use'
    app.use('/guildas', guildasRouter);
    ```
    Isso diz ao Express: "Qualquer URL que comece com `/guildas`, direcione para o `guildasRouter`."

3.  **Implemente as Rotas CRUD:** Dentro de `guildas.js`, crie os endpoints para as operações básicas. Use o que você aprendeu com as rotas de Aventureiro como guia:
    *   `GET /guildas`: Deve retornar uma lista de todas as guildas.
    *   `POST /guildas`: Deve criar uma nova guilda. O cliente enviará o nome da guilda no corpo (`req.body`) da requisição.
    *   `GET /guildas/:id`: Deve retornar os detalhes de uma única guilda.
    *   `PUT /guildas/:id`: Deve atualizar o nome de uma guilda.
    *   `DELETE /guildas/:id`: Deve remover uma guilda.

## Parte 3: O Desafio do Recrutamento!

Esta é a missão mais importante! Como criar um endpoint que permita recrutar um **aventureiro já existente** para uma **guilda já existente**?

Esta operação envolve duas entidades diferentes, então a solução é um pouco mais elaborada.

**Diretrizes para o Desafio:**

-   **Pense no Endpoint:** Uma boa prática para representar a adição de um item a uma coleção é usar o `POST` em um sub-recurso. Que tal `POST /guildas/:id/membros`? O `:id` aqui seria o da **guilda**.

-   **Pense nos Dados:** Como você vai dizer ao servidor **qual aventureiro** recrutar? O corpo da requisição (`req.body`) é o lugar ideal. Você pode enviar um JSON como este: `{ "aventureiroId": 2 }`.

-   **Pense na Lógica (O Fluxo do Recrutamento):**
    1.  Dentro da sua nova rota, você precisará do `GuildaDAO` e também do `AventureiroDAO`. Não se esqueça de importá-los!
    2.  Pegue o ID da Guilda que veio pela URL (`req.params.id`).
    3.  Pegue o ID do Aventureiro que veio no corpo da requisição (`req.body.aventureiroId`).
    4.  Use o `GuildaDAO` para encontrar o **objeto completo** da guilda.
    5.  Use o `AventureiroDAO` para encontrar o **objeto completo** do aventureiro.
    6.  **Verificação de Segurança:** O que acontece se a guilda não for encontrada? E se o aventureiro não existir? Você deve retornar um erro 404!
    7.  Se ambos existirem, é hora da mágica: chame o método `recrutarAventureiro()` do objeto da guilda, passando o objeto do aventureiro como argumento: `objetoGuilda.recrutarAventureiro(objetoAventureiro)`.
    8.  Envie uma resposta de sucesso para o cliente!

---

Ao completar esta jornada, você não apenas terá criado uma API mais complexa, mas também terá aprendido a gerenciar as relações entre diferentes recursos do seu sistema. Boa sorte, Mestre das Guildas!
