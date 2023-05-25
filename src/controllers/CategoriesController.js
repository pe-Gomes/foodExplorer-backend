const knex = require('../database/knex')

class CategoriesController {
  async index(req, res) {
    const { category } = req.query
    const user_id = req.user.id

    let indexCategory

    if (category) {
      indexCategory = await knex('categories').where('name', category)

      const allProducts = await knex('products')
      const allFavorites = await knex('favorites').where({ user_id })

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
      const allProducts = await knex('products')
      const allIngredients = await knex('ingredients')
      const allCategories = await knex('categories')
      const userFavorites = await knex('favorites').where({ user_id })

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

    return res.json(indexCategory)
  }
}

module.exports = CategoriesController
