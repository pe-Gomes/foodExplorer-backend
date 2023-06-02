const knex = require('../database/knex')

class ProductRepository {
  async findByTitle(title) {
    const productTitleExists = await knex
      .select('*')
      .from('products')
      .where('title', title)
      .first()

    return productTitleExists
  }

  async findById(product_id) {
    const product = await knex
      .select('*')
      .from('products')
      .where('id', product_id)
      .first()

    return product
  }

  async create(
    { title, description, price, ingredients, category, image },
    user_id,
  ) {
    const [product_id] = await knex('products').insert({
      title,
      description,
      price,
      user_id,
    })

    console.log(user_id)

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        product_id,
        name: ingredient,
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    await knex('categories').insert({ name: category, product_id })

    if (image) {
      await knex('products').where('id', product_id).update({ image })
    }

    return { id: product_id }
  }

  async update(
    { title, description, price, ingredients, category, image },
    product_id,
    user_id,
  ) {
    const product = await knex
      .select('*')
      .from('products')
      .where('id', product_id)
      .first()

    product.title = title ?? product.title
    product.description = description ?? product.description
    product.ingredients = ingredients ?? product.ingredients
    product.category = category ?? product.category
    product.price = price ?? product.price
    product.image = image ?? product.image

    if (category) {
      await knex('categories').where({ product_id }).update({ name: category })
    }

    if (ingredients) {
      await knex('ingredients').where({ product_id }).delete()

      const ingredientsInsert = ingredients.map((ingredient) => {
        return {
          product_id,
          name: ingredient,
        }
      })

      await knex('ingredients').insert(ingredientsInsert)
    }

    await knex('products').where('id', product_id).update({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      user_id,
      updated_at: knex.fn.now(),
    })

    return product
  }

  async delete(product_id) {
    const deleted = await knex('products').where('id', product_id).delete()
    return deleted
  }

  async show({ id }) {
    const product = await knex('products').where({ id }).first()
    const category = await knex('categories')
      .where('product_id', id)
      .orderBy('name')
    const ingredients = await knex('ingredients')
      .where('product_id', id)
      .orderBy('name')

    return {
      ...product,
      category,
      ingredients,
    }
  }

  async index({ search }, user_id) {
    let products

    if (search) {
      const filterSearch = search.split(',').map((each) => each.trim())

      products = await knex
        .select('*')
        .from('products')
        .select([
          'products.id',
          'products.title',
          'products.description',
          'products.price',
          'products.image',
          knex.raw('GROUP_CONCAT(ingredients.name) as ingredients'),
        ])
        .leftJoin('ingredients', 'products.id', 'ingredients.product_id')
        .whereLike('products.title', `%${filterSearch}%`)
        .orWhereLike('ingredients.name', `%%${filterSearch}`)
        .groupBy('products.id')
    } else {
      products = await knex
        .select('*')
        .from('products')
        .select([
          'products.id',
          'products.title',
          'products.description',
          'products.price',
          'products.image',
        ])
        .groupBy('products.id')
    }

    const allIngredients = await knex('ingredients')
    const allCategories = await knex('categories')
    const userFavorites = await knex('favorites').where({ user_id })

    const productsInformation = products.map((product) => {
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
    return productsInformation
  }
}

module.exports = ProductRepository
