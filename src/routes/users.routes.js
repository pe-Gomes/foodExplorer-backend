const { Router } = require('express')
const ensureAuth = require('../middlewares/ensureAuth')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post('/', usersController.create)

module.exports = usersRoutes
