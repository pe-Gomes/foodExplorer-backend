const knex = require("../database/knex");

class CategoriesController {
  async index(req, res){
    const { category } = req.query;
  
    const allCategories = await knex("categories");
  
    let indexCategory
  
    if (category) {
      indexCategory = await knex("categories")
        .where("name", category)

        const allProducts = await knex("products");

        const productByCategory = indexCategory.map( entry => {
          const filteredProducts = allProducts.filter( product => product.id == entry.product_id );
          return {
            ...entry,
            product: filteredProducts,
          }
        })

        indexCategory = productByCategory;

    } else {
      indexCategory = allCategories;
    }
    



    return res.json(indexCategory);
  }
}

module.exports = CategoriesController;