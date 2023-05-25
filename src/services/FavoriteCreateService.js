class FavoriteCreateSErvice {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async create({ product_id, user_id }) {
    return this.favoritesRepository.create({ product_id, user_id })
  }

  async delete({ product_id, user_id }) {
    return this.favoritesRepository.delete({ product_id, user_id })
  }

  async index({ user_id }) {
    const favorites = await this.favoritesRepository.findByUser({ user_id })
    const allProducts = await this.favoritesRepository.fetchProducts()

    const productsWithFavorites = allProducts.map((product) => {
      const usersFavorites = favorites.filter(
        (favorite) => favorite.product_id === product.id,
      )
      return {
        ...product,
        favorite: usersFavorites,
      }
    })

    return productsWithFavorites
  }
}

module.exports = FavoriteCreateSErvice
