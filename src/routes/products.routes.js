const { Router } = require('express')
const ensureAuth = require('../middlewares/ensureAuth')
const ensureSudo = require('../middlewares/ensureSudo')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ProductsController = require('../controllers/ProductsController')
const ProductImageController = require('../controllers/ProductImageController')

const productsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const productsController = new ProductsController()
const productImageController = new ProductImageController()

productsRoutes.use(ensureAuth)

productsRoutes.post('/', ensureSudo, productsController.create)
productsRoutes.put('/:id', ensureSudo, productsController.update)
productsRoutes.delete('/:id', ensureSudo, productsController.delete)
productsRoutes.get('/:id', productsController.show)
productsRoutes.get('/', productsController.index)
productsRoutes.patch(
  '/:id/image',
  ensureSudo,
  upload.single('image'),
  productImageController.update,
)

module.exports = productsRoutes
