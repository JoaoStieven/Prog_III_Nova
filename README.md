# Simulador de Guilda

Este é um projeto educacional de um simulador de guilda de aventureiros, construído com Express.js.

## Configuração do Ambiente de Desenvolvimento

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (que inclui o npm)

### Instruções para Linux

1.  **Instalar o express-generator globalmente (opcional):**

    ```bash
    npm install -g express-generator
    ```

    Este comando instala o `express-generator` globalmente em seu sistema, permitindo que você use o comando `express` diretamente do seu terminal.

2.  **Criar o projeto:**

    ```bash
    express --view=ejs simulador-guilda
    ```

    Este comando cria um novo projeto Express chamado `simulador-guilda` com o view engine EJS.

3.  **Navegar para o diretório do projeto:**

    ```bash
    cd simulador-guilda
    ```

4.  **Instalar as dependências:**

    ```bash
    npm install
    ```

    Este comando lê o arquivo `package.json` e instala todas as dependências do projeto.

5.  **Executar o projeto:**

    ```bash
    npm start
    ```

    Este comando inicia o servidor de desenvolvimento. Você pode acessar o aplicativo em `http://localhost:3000`.

### Instruções para Windows

1.  **Criar o projeto com npx:**

    ```bash
    npx express-generator --view=ejs simulador-guilda
    ```

    O `npx` permite que você execute pacotes npm sem a necessidade de instalá-los globalmente. Este comando cria um novo projeto Express chamado `simulador-guilda` com o view engine EJS.

2.  **Navegar para o diretório do projeto:**

    ```bash
    cd simulador-guilda
    ```

3.  **Instalar as dependências:**

    ```bash
    npm install
    ```

    Este comando lê o arquivo `package.json` e instala todas as dependências do projeto.

4.  **Executar o projeto:**

    ```bash
    npm start
    ```

    Este comando inicia o servidor de desenvolvimento. Você pode acessar o aplicativo em `http://localhost:3000`.
