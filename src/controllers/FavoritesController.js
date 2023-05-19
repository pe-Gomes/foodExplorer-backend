const knex = require('../database/knex')

class FavoritesController {
  async create(req, res) {
    const { product_id } = req.query
    const user_id = req.user.id

    await knex('favorites').insert({
      user_id,
      product_id,
    })
    return res.json()
  }

  async delete(req, res) {
    const { product_id } = req.query
    const user_id = req.user.id

    await knex('favorites').where({ user_id, product_id }).delete()

    return res.json()
  }

  async index(req, res) {
    const { product_id } = req.query
    const user_id = req.user.id

    const favorites = await knex('favorites').where({ user_id })
    const allProducts = await knex('products')

    const productsWithFavorites = allProducts.map((product) => {
      const usersFavorites = favorites.filter(
        (favorite) => favorite.product_id == product.id,
      )
      return {
        ...product,
        favorite: usersFavorites,
      }
    })

    res.json(productsWithFavorites)
  }
}

module.exports = FavoritesController
