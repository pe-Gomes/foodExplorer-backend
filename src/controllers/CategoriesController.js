const CategoryCreateService = require('../services/CategoryCreateService')
const CategoryRepository = require('../repositories/CategoryRepository')

class CategoriesController {
  async index(req, res) {
    const { category } = req.query
    const user_id = req.user.id

    const categoryRepository = new CategoryRepository()
    const categoryCreateService = new CategoryCreateService(categoryRepository)
    const indexCategory = await categoryCreateService.execute({
      category,
      user_id,
    })

    return res.json(indexCategory)
  }
}

module.exports = CategoriesController
