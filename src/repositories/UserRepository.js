const knex = require('../database/knex')

class UserRepository {
  async findByEmail(email) {
    const users = await knex('users').select('email')
    const user = await users.some((user) => user.email === email)

    return user
  }

  async create({ name, email, password }) {
    const userId = await knex('users').insert({
      name,
      email,
      password,
    })

    return { id: userId }
  }
}

module.exports = UserRepository