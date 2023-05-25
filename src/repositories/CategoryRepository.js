const knex = require('../database/knex')

class CategoryRepository {
  async findByCategory({ category }) {
    return knex('categories').where('name', category)
  }

  async fetchProducts() {
    return await knex('products')
  }

  async fetchIngredients() {
    return await knex('ingredients')
  }

  async fetchCategories() {
    return await knex('categories')
  }

  async fetchFavoritesByUser({ user_id }) {
    return knex('favorites').where({ user_id })
  }
}

module.exports = CategoryRepository
