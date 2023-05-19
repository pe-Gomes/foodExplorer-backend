const knex = require('../database/knex')
const AppError = require('../utils/AppError')

async function ensureSudo(req, res, next) {
  const user_id = req.user.id

  const user = await knex('users').where('id', user_id).first()
  const isAdmin = user.admin == true

  if (isAdmin) {
    return next()
  } else {
    throw new AppError('Acesso restrito.', 401)
  }
}

module.exports = ensureSudo
