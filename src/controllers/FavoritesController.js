const knex = require("../database/knex");

class FavoritesController {
  async create(req, res) {
    const { product_id } = req.query; 
    const user_id = req.user.id;

    await knex("favorites").insert({
      user_id,
      product_id
    });
    return res.json();
  }

  async delete(req, res) {
    const { product_id } = req.query; 
    const user_id = req.user.id;

    await knex("favorites").where({ user_id,  product_id}).delete()
    
    return res.json();
  }
}

module.exports = FavoritesController;