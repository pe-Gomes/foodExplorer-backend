const DiskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError')

class ProductCreateService {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async new(
    { title, description, price, ingredients, category, image },
    user_id,
  ) {
    const productTitleExists = await this.productRepository.findByTitle(title)

    if (productTitleExists) {
      throw new AppError('Já existe um produto com o mesmo nome.')
    }

    const productCreated = await this.productRepository.create(
      { title, description, price, ingredients, category, image },
      user_id,
    )

    return productCreated
  }

  async update(
    { title, description, price, ingredients, category, image },
    product_id,
    user_id,
  ) {
    const product = this.productRepository.findById(product_id)

    if (!product) {
      throw new AppError('O produto não foi encontrado.')
    }

    if (title) {
      const productTitleExists = this.productRepository.findByTitle(title)

      if (productTitleExists && product.id !== product_id) {
        throw new AppError('Já existe um produto com o mesmo nome.')
      }
    }

    const productUpdated = await this.productRepository.update(
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

    return productUpdated
  }

  async delete(product_id) {
    const product = await this.productRepository.findById(product_id)

    if (!product) {
      throw new AppError('O produto não foi encontrado.')
    }

    if (product.image) {
      const diskStorage = new DiskStorage()

      await diskStorage.deleteFile(product.image)
    }

    return await this.productRepository.delete(product_id)
  }

  async show({ id }) {
    const product = this.productRepository.findById({ id })

    if (!product) {
      throw new AppError('O produto não foi encontrado.')
    }

    return await this.productRepository.show({ id })
  }

  async index({ search }, user_id) {
    return await this.productRepository.index({ search }, user_id)
  }
}

module.exports = ProductCreateService
