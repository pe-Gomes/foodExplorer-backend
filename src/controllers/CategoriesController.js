const knex = require("../database/knex");

class CategoriesController {
  async index(req, res){
    const allCategories = await knex("categories").groupBy("name");

    return res.json(allCategories);
  }
}

module.exports = CategoriesController;