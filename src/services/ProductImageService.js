const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class ProductImageService {
  constructor(productImageRepository) {
    this.productImageRepository = productImageRepository
  }

  async create(imgName) {
    const diskStorage = new DiskStorage()

    const fileName = await diskStorage.saveFile(imgName)

    return { image: fileName }
  }

  async update(product_id, imgName) {
    const diskStorage = new DiskStorage()

    const product = await this.productImageRepository.findById(product_id)

    if (!product) {
      throw new AppError(
        'Somente produtos cadastrados podem atualizar a imagem.',
      )
    }

    if (product.image) {
      await diskStorage.deleteFile(product.image)
    }

    const fileName = await diskStorage.saveFile(imgName)
    product.image = fileName

    await this.productImageRepository.update(product, product_id)

    return { image: fileName }
  }
}

module.exports = ProductImageService
