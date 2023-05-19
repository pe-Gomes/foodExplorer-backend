const { Router } = require('express')
const ensureAuth = require('../middlewares/ensureAuth')

const FavoritesController = require('../controllers/FavoritesController')

const favoritesRoutes = Router()

const favoritesController = new FavoritesController()

favoritesRoutes.post('/', ensureAuth, favoritesController.create)
favoritesRoutes.delete('/', ensureAuth, favoritesController.delete)
favoritesRoutes.get('/', ensureAuth, favoritesController.index)

module.exports = favoritesRoutes
