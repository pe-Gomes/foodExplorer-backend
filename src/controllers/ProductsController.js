const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const ProductImageController = require("./ProductImageController");

class ProductsController {
  async create(req, res){
    const { title, description, price, ingredients, category, image } = req.body;
    const user_id = req.user.id;

    const productTitleExists = await knex.select("*").from("products").where("title", title).first()
      
    if (productTitleExists) {
        throw new AppError("Já existe um produto com o mesmo nome.");
      };

      const [product_id] = await knex("products").insert({
        title,
        description,
        price,
        user_id
      });
    
    const ingredientsInsert = ingredients.map( ingredient => {
      return {
        product_id,
        name: ingredient
      }
    });
    
    await knex("ingredients").insert(ingredientsInsert);

    await knex("categories").insert({ name: category, product_id });

    if (image) {
      await knex("products").where("id", product_id).update({ image });
    }

    return res.status(201).json();
  }

  async update(req, res) {
    const { title, description, price, ingredients, category, image } = req.body;
    const { id: product_id } = req.params;
    const user_id = req.user.id;
    
    const product = await knex.select("*").from("products").where("id", product_id).first();
  
    if (!product) {
      throw new AppError("O produto não foi encontrado.")
    }

    if (title) {
      const productTitleExists = await knex.select("*").from("products").where("title", title).first()
      
      if (productTitleExists && product.id != product_id) {
        throw new AppError("Já existe um produto com o mesmo nome.");
      }  
    }
    
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.ingredients = ingredients ?? product.ingredients;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.image = image ?? product.image;

    if (category) {
      await knex("categories").where({ product_id }).update({name: category});
    }

    if (ingredients) {
      await knex("ingredients").where({ product_id }).delete();

      const ingredientsInsert = ingredients.map(ingredient => {
        return {
          product_id,
          name: ingredient
        };
      });
        
      await knex("ingredients").insert(ingredientsInsert);
    }
    
    await knex("products").where("id", product_id).update({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      user_id: user_id,
      updated_at: knex.fn.now()

    })

    return res.status(200).json(product);
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("products").where({ id }).delete();

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await knex("products").where({ id }).first();
    const category = await knex("categories").where("product_id", id).orderBy("name");
    const ingredients = await knex("ingredients").where("product_id", id).orderBy("name");
    
    return res.json({
      ...product,
      category,
      ingredients
    })
  }

  async index(req, res) {
    const { title, ingredients } = req.query;

    let products;

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map( ingredient => ingredient.trim());

      products = await knex("products").innerJoin("ingredients").select([
        "products.id",
        "products.title",
      ])
        .whereIn("ingredients.name", filterIngredients)
        .whereLike("products.title", `%${title}%` || "ingredients.name")
        .groupBy("products.id")
        .orderBy("products.title");


    } else {
      products = await knex("products")
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
    
    const allIngredients = await knex("ingredients");
    const allCategories = await knex("categories");
    
    const productsInformation = products.map( product => {
      const productIngredients = allIngredients.filter( ingredient => ingredient.product_id == product.id);
      const productCategory = allCategories.filter( category => category.product_id == product.id)
        
      return {
          ...product,
          ingredients: productIngredients,
          categories: productCategory
        }
    })

    res.json(productsInformation);
  }

}

module.exports = ProductsController;