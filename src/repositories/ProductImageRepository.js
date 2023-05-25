const knex = require('../database/knex')

class ProductImageRepository {
  async findById(product_id) {
    return await knex('products').where('id', product_id).first()
  }

  async update(product, product_id) {
    await knex('products').update(product).where('id', product_id)
  }
}

module.exports = ProductImageRepository
