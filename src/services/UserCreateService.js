const AppError = require('../utils/AppError')
const { hash } = require('bcryptjs')

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('Este e-mail já está sendo utilizado.')
    }

    const passwordLength = password.length

    if (passwordLength < 6) {
      throw new AppError('A senha, no mínimo, deve ter 6 caracteres.')
    }

    const hashedPassword = await hash(password, 8)
    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return userCreated
  }
}

module.exports = UserCreateService
