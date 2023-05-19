const { Router } = require('express')
const ensureAuth = require('../middlewares/ensureAuth')
const ensureSudo = require('../middlewares/ensureSudo')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ProductImageController = require('../controllers/ProductImageController')

const filesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const productImageController = new ProductImageController()

filesRoutes.patch(
  '/',
  ensureAuth,
  ensureSudo,
  upload.single('image'),
  productImageController.create,
)

module.exports = filesRoutes
