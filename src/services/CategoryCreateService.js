class CategoryCreateService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async execute({ category, user_id }) {
    let indexCategory

    if (category) {
      indexCategory = await this.categoryRepository.findByCategory({ category })

      const allProducts = await this.categoryRepository.fetchProducts()
      const allFavorites = await this.categoryRepository.fetchFavoritesByUser({
        user_id,
      })

      const productByCategory = indexCategory.map((entry) => {
        const filteredProducts = allProducts.filter(
          (product) => product.id === entry.product_id,
        )
        const filteredFavorites = allFavorites.filter(
          (favorite) => favorite.product_id === entry.product_id,
        )
        return {
          ...entry,
          product: filteredProducts,
          favorite: filteredFavorites,
        }
      })

      indexCategory = productByCategory
    } else {
      const allProducts = await this.categoryRepository.fetchProducts()
      const allIngredients = await this.categoryRepository.fetchIngredients()
      const allCategories = await this.categoryRepository.fetchCategories()
      const userFavorites = await this.categoryRepository.fetchFavoritesByUser({
        user_id,
      })

      const productsInformation = allProducts.map((product) => {
        const productIngredients = allIngredients.filter(
          (ingredient) => ingredient.product_id === product.id,
        )
        const productCategory = allCategories.filter(
          (category) => category.product_id === product.id,
        )
        const filteredFavorites = userFavorites.filter(
          (favorite) => favorite.product_id === product.id,
        )

        return {
          ...product,
          ingredients: productIngredients,
          categories: productCategory,
          favorites: filteredFavorites,
        }
      })

      // Changing data to an Object of each Category, the object contains an array of products
      const productsByCategory = productsInformation.reduce(
        (productsByCategory, eachProduct) => {
          productsByCategory[eachProduct.categories[0].name] =
            productsByCategory[eachProduct.categories[0].name] || []
          productsByCategory[eachProduct.categories[0].name].push(eachProduct)
          return productsByCategory
        },
        {},
      )

      indexCategory = productsByCategory
    }

    return indexCategory
  }
}

module.exports = CategoryCreateService
