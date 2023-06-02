const ProductImageRepository = require('../repositories/ProductImageRepository')
const ProductImageService = require('../services/ProductImageService')

class ProductImageController {
  async update(req, res) {
    const { id: product_id } = req.params
    const imgName = req.file.filename

    const productImageRepository = new ProductImageRepository()
    const productImageService = new ProductImageService(productImageRepository)
    const fileName = await productImageService.update(product_id, imgName)

    return res.json(fileName)
  }

  async create(req, res) {
    const imgName = req.file.filename

    const productImageRepository = new ProductImageRepository()
    const productImageService = new ProductImageService(productImageRepository)
    const fileName = await productImageService.create(imgName)

    return res.json(fileName)
  }
}

module.exports = ProductImageController
