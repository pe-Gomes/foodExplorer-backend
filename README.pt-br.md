
# Food Explorer
Escolha a melhor língua para sua compreensão: 
[![en](https://img.shields.io/badge/lang-en-red.svg)](./README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](./README.pt-br.md)

Uma API para um restaurante. O presente projeto é um back-end construído com Node.js e JavaScript, além de ser integrado com um banco de dados SQLite, cuja migração e acesso é realizada por meio do Knex.js.

A API foi desenvolvida para realizar as seguintes características:

* **Criar** usuários.
* **Criar, atualizar e deletar** produtos.
* **Fazer upload and deletar arquivos** relacionados com as images de cada produto.
* **Gerir as categorias de cada produto** (bebidas, refeições e sobremesas).
* **Definir quais são os produtos favoritos dos usuários**.
* Usar **JWT Token** para autenticar o usuário e criar um sessão quando logado.
* Apenas *usuários admin poderão fazer alterações* de produto.

## Instalação

Instale o foodExplorer-backend com npm. Para rodar localmente, simplesmente rode o comando "npm install" enquanto estiver na pasta do projeto e, depois, rode "npm run dev" ou "npm start" para iniciar a API.

```bash
  ## Enter the project's folder
  cd foodExplorer-backend
  
  ## Install node dependencies
  npm install

  ## Run the API
  npm start

  ## Alternatively, if you want to run with nodemon
  npm run dev
```
    
## Variáveis de Ambiente

Para rodar este projeto você poderá adicionar as seguintes variáveis de ambiente no seu arquivo .env

| Env | Description                |
| :-------- | :------------------------- |
| `AUTH_SECRET` | É a chave segredo necessária para validar os tokens de usuário autenticados com a ajuda do jsonwebtoken. Se você não definir nenhum valor, por padrão será aplicado o valor *'default'*|
| `PORT` | Escolha a porta em que seu server rodará. Se não for definida, a porta padrão é a `3333`. |


## Database (Base de Dados)

Para alcançar o objetivo do presente projeto foi esboçado um diagrama para definir como a base de dados seria relacionada:

![Diagram of project's database](./public/db_diagram.png)


## Referência para a API
Caso queira um atalho, as configurações de cada requisição HTTP estão disponíveis no arquivo `insomnia_settings.json`, assim você pode deixar o Insomnia fazer o trabalho por você.

#### Acesse todos os produtos

```http
  GET /api/products
```

#### Acesse um produto

```http
  GET /api/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Necessário**. Id do produto a ser acessado |

#### Pesquisar produtos

```http
  GET /api/product?search=${anything}
```

|   Query   | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `search`  | `string` |  Pesquise por ingredientes ou nome de produtos |

#### Criar um produto (apenas quando admin)
Espera receber um JSON com as propriedades que definirão os dados do produto.

```http
  POST /api/product
```
|   Property   | Type               | Description                       |
| :--------    | :------------------| :-------------------------------- |
| `title`      | `string`           |  Nome do produto |
| `description`| `string`           | Descrição do produto |
| `price`      | `number`           | Preço do produto |
| `ingredients`| `array of strings` | Cada ingrediente do produto |
| `category`   | `string`           | Categoria do produto (refeição, bebida, sobremesa, etc)|
| `image`      | `string`           | Define o nome único do arquivo que foi transferido ao servidor. |


#### Alterar o produto

Funciona do mesmo modo que criar um produto, mas dessa vez com uma requisição PUT e um parâmetro de ID.

```http
  PUT /api/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id do produto acessado |


## Tecnologias Utilizadas

**Cliente:** React, Vite, Styled Components, HeadlessUI.

**Servidor:** Node, Express, Knex, jsonwebtoken, Jest, Multer, dotenv.

