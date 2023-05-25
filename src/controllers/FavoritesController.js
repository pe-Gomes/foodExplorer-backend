const FavoriteRepository = require('../repositories/FavoritesRepository')
const FavoriteCreateService = require('../services/FavoriteCreateService')

class FavoritesController {
  async create(req, res) {
    const { product_id } = req.query
    const user_id = req.user.id

    const favoritesRepository = new FavoriteRepository()
    const favoriteCreateService = new FavoriteCreateService(favoritesRepository)
    await favoriteCreateService.create({ product_id, user_id })

    return res.status(201).json()
  }

  async delete(req, res) {
    const { product_id } = req.query
    const user_id = req.user.id

    const favoritesRepository = new FavoriteRepository()
    const favoriteCreateService = new FavoriteCreateService(favoritesRepository)
    await favoriteCreateService.delete({ product_id, user_id })

    return res.json()
  }

  async index(req, res) {
    const user_id = req.user.id

    const favoritesRepository = new FavoriteRepository()
    const favoriteCreateService = new FavoriteCreateService(favoritesRepository)
    const productsWithFavorites = await favoriteCreateService.index({ user_id })

    res.json(productsWithFavorites)
  }
}

module.exports = FavoritesController
