class ProductRepositoryInMemory {
  products = []
  categories = []
  ingredients = []

  async findByTitle(title) {
    return this.products.find((product) => product.title === title)
  }

  async findById(product_id) {
    return this.products.find((product) => product.id === product_id)
  }

  async create(
    { title, description, price, ingredients, category, image },
    user_id,
  ) {
    const product = {
      id: Math.floor(Math.random() * 1000) + 1,
      user_id,
      title,
      description,
      price,
      image,
    }

    const insertedCategory = {
      id: Math.floor(Math.random() * 1000) + 1,
      product_id: product.id,
      name: category,
    }

    const insertedIngredients = ingredients.map((ingredient) => {
      return {
        id: Math.floor(Math.random() * 1000) + 1,
        product_id: product.id,
        name: ingredient,
      }
    })

    this.products.push(product)
    this.categories.push(insertedCategory)
    this.ingredients.push(insertedIngredients)

    return {
      product,
      category: insertedCategory,
      ingredients: insertedIngredients,
    }
  }
}

module.exports = ProductRepositoryInMemory
