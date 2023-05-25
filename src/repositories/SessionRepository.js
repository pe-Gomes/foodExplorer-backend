const knex = require('../database/knex')

class SessionRepository {
  async findByEmail({ email }) {
    return await knex('users').where({ email }).first()
  }
}

module.exports = SessionRepository
