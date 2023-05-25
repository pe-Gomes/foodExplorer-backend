const UserCreateService = require('./ProductCreateService')
const ProductRepositoryInMemory = require('../repositories/in-memory/productRepositoryInMemory')

describe('ProductCreateService', () => {
  let productRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory()
    userCreateService = new UserCreateService(productRepositoryInMemory)
  })

  it('product, category and ingredients should be created', async () => {
    const user_id = 1
    const product_id = 1

    const product = {
      title: 'Test',
      description: 'teste',
      price: '9.98',
      image: 'img.png',
      ingredients: ['1', '2'],
      category: 'test',
    }

    const created = await userCreateService.new(product, user_id, product_id)

    expect(created.product).toEqual({
      id: created.product.id,
      title: 'Test',
      description: 'teste',
      price: '9.98',
      image: 'img.png',
      user_id,
    })
    expect(created.category).toHaveProperty('id')
    created.ingredients.map((ingredient) =>
      expect(ingredient).toHaveProperty('id'),
    )
  })
})
