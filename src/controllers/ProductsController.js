const ProductRepository = require('../repositories/ProductRepository')
const ProductCreateService = require('../services/ProductCreateService')

class ProductsController {
  async create(req, res) {
    const { title, description, price, ingredients, category, image } = req.body
    const user_id = req.user.id

    const productRepository = new ProductRepository()
    const productCreateService = new ProductCreateService(productRepository)
    await productCreateService.new(
      { title, description, price, ingredients, category, image },
      user_id,
    )

    return res.status(201).json()
  }

  async update(req, res) {
    const { title, description, price, ingredients, category, image } = req.body
    const { id: product_id } = req.params
    const user_id = req.user.id

    const productRepository = new ProductRepository()
    const productCreateService = new ProductCreateService(productRepository)
    const product = await productCreateService.update(
      {
        title,
        description,
        price,
        ingredients,
        category,
        image,
      },
      product_id,
      user_id,
    )

    return res.status(200).json(product)
  }

  async delete(req, res) {
    const { id } = req.params

    const productRepository = new ProductRepository()
    const productCreateService = new ProductCreateService(productRepository)
    await productCreateService.delete({ id })

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const productRepository = new ProductRepository()
    const productCreateService = new ProductCreateService(productRepository)
    const product = await productCreateService.show({ id })

    return res.json(product)
  }

  async index(req, res) {
    const { search } = req.query
    const user_id = req.user.id

    const productRepository = new ProductRepository()
    const productCreateService = new ProductCreateService(productRepository)
    const searchResults = await productCreateService.index({ search }, user_id)

    res.json(searchResults)
  }
}

module.exports = ProductsController
