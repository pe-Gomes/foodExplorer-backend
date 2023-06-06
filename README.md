
# Food Explorer
### Pick the best language for you: 
[![en](https://img.shields.io/badge/lang-en-red.svg)](./README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](./README.pt-br.md)

An API for a restaurant website. The back-end was created with Node.js and JavaScript, integrated with SQLite and managed with Knex.js.

The back-end was created to provide the following features:

* **Create** users.
* **Create, update and delete** products.
* **Upload and delete files** for product images.
* **Manage categories for products** (drink, meal and dessert).
* **Set user's favorite products**.
* Use **JWT Token** to authenticate and create user session.
* Only *admin users can manage* products.

## Deployed API

The web service can be accessed without local running using the following link: https://foodexplorer-backend-vcq3.onrender.com

## Installation

Install foodExplorer-backend with npm. To run locally, simple run "npm install" while on the project folder and run it with "npm run dev" or "npm start"

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
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Env           | Description                                                                                                                                                  |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTH_SECRET` | This will be the secret needed to validate user's tokens with jsonwebtoken. If you don't set any value, the project will run with *'default'* value instead. |
| `PORT`        | This sets the port that your server is going to be running. If not set, the default port is `3333`                                                           |


## Database

To achieve the goals of the project, it was built a database with the following diagram:

![Diagram of project's database](./public/db_diagram.png)

Obs: In order to have admin privileges, it is needed to manually set to true the admin property in the Users table.

## API Reference
If you want a shortcut, the settings for every HTTP request are available on the file `insomnia_settings.json`, so you can let Insomnia do the job.

#### Get all products

```http
  GET /api/products
```

#### Get product

```http
  GET /api/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Search products

```http
  GET /api/product?search=${anything}
```

| Query    | Type     | Description                              |
| :------- | :------- | :--------------------------------------- |
| `search` | `string` | Search for ingredients and product names |

#### Create product
Expects an JSON with the data that should be created.

```http
  POST /api/product
```
| Property      | Type               | Description                                                        |
| :------------ | :----------------- | :----------------------------------------------------------------- |
| `title`       | `string`           | Name of the product                                                |
| `description` | `string`           | Description of the product                                         |
| `price`       | `number`           | Price of the product                                               |
| `ingredients` | `array of strings` | Each ingredient of the product                                     |
| `category`    | `string`           | Category of product (meal, drink, dessert, etc)                    |
| `image`       | `string`           | Sets the location of the file uploaded on creation of the product. |


#### Update product

Works in the same way of create product, but with a PUT request.

```http
  PUT /api/product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **RequiredClique aqui para acessar o repositório**. Id of item to fetch |

#### Delete product 

```http
  DELETE /api/product/${id}
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `string` | **Required**. Id do produto que será deletado |


#### Create users
Expects to receive a JSON with properties to create the user data. Thus, name, e-mail and a password larger than 6 characters.

```http
  POST /api/users
```

| JSON Property | Type     | Description     |
| :------------ | :------- | :-------------- |
| `name`        | `string` | User's name     |
| `e-mail`      | `string` | User's e-mail   |
| `password`    | `string` | User's password |

#### Criar sessão de autenticação
Expects to receive a JSON with properties to log the user: e-mail and password.

``` http
  POST /api/sessions
```

| JSON Property | Type     | Description                                                         |
| :------------ | :------- | :------------------------------------------------------------------ |
| `e-mail`      | `string` | User's e-mail                                                       |
| `password`    | `string` | User's password that will be compared to the saved hash on database |

#### Acessar categorias
Seeks the porpoise of searching products by each category. When a query named `category` is provided, it'll be made a search by the provided category. If no query is provided, it'll return all products in a object. The object contains each category as a property and, within each property, there is an array spreading all the products that matches the object's property (category).


```http
  GET /api/categories?category=${anything}
```
| Query      | Type     | Description                                                                                  |
| :--------- | :------- | :------------------------------------------------------------------------------------------- |
| `category` | `string` | **Not required**. When defined, filters the search for all products by the provided category |

#### Create user's favorite

```http
  POST /api/favorites?product_id=${id}
```
| Query        | Type     | Description                                              |
| :----------- | :------- | :------------------------------------------------------- |
| `product_id` | `string` | **Required**. Id of the product that will be a favorite. |

#### Deletar favorito do usuário 
The same as creating a favorite, but with a DELETE request.
```http
  DELETE /api/favorites?product_id=${id}
```

| Query        | Type     | Description                                                         |
| :----------- | :------- | :------------------------------------------------------------------ |
| `product_id` | `string` | **Required**. Id of the product that will be removed from favorite. |

#### Upload product's image file

```http
  PATCH /api/files
```
| Multipart | Type   | Description                         |
| :-------- | :----- | :---------------------------------- |
| `image`   | `file` | **Required**. Product's image file. |

#### View images

``` http
  GET /api/images/${filename}
```
| Param      | Type     | Description                                                                      |
| :--------- | :------- | :------------------------------------------------------------------------------- |
| `filename` | `string` | **Required**. Name of the file that was created on upload and stored on database |


## Tech Stack

**Client:** React, Vite, Styled Components, HeadlessUI.

**Server:** Node, Express, Knex, jsonwebtoken, Jest, Multer, dotenv.

This API was used with a front-end called **foodExplorer-frontend**: [Click here to check out the repo](https://github.com/pe-Gomes/foodExplorer-frontend).