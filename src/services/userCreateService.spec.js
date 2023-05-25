const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../repositories/in-memory/userRepositoryInMemory')
const AppError = require('../utils/AppError')

describe('UserCreateService', () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it('user should be created', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '123456',
    }

    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty('id')
  })

  it('the user should not be created with email already registered', async () => {
    const user1 = {
      name: 'Test 1',
      email: 'test@email.com',
      password: '123456',
    }

    const user2 = {
      name: 'Test 2',
      email: 'test@email.com',
      password: '123456',
    }

    await userCreateService.execute(user1)
    expect(async () => {
      await userCreateService.execute(user2)
    }).rejects.toEqual(new AppError('Este e-mail já está sendo utilizado.'))
  })

  it('users passwords should have at least 6 characters', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '1',
    }

    expect(async () => {
      await userCreateService.execute(user)
    }).rejects.toEqual(
      new AppError('A senha, no mínimo, deve ter 6 caracteres.'),
    )
  })
})
