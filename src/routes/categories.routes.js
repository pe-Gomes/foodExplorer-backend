const { Router } = require('express')
const ensureAuth = require('../middlewares/ensureAuth')

const CategoriesController = require('../controllers/CategoriesController')

const categoriesRoutes = Router()

const categoriesController = new CategoriesController()

categoriesRoutes.get('/', ensureAuth, categoriesController.index)

module.exports = categoriesRoutes
