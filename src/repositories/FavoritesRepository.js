const knex = require('../database/knex')

class FavoriteRepository {
  async findByUser({ user_id }) {
    return await knex('favorites').where({ user_id })
  }

  async fetchProducts() {
    return await knex('products')
  }

  async create({ product_id, user_id }) {
    return await knex('favorites').insert({
      user_id,
      product_id,
    })
  }

  async delete({ product_id, user_id }) {
    return await knex('favorites').where({ user_id, product_id }).delete()
  }
}

module.exports = FavoriteRepository
