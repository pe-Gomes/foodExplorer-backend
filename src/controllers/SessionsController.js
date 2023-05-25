const SessionRepository = require('../repositories/SessionRepository')
const SessionService = require('../services/SessionService')

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const sessionRepository = new SessionRepository()
    const sessionService = new SessionService(sessionRepository)
    const userToken = await sessionService.execute({ email, password })

    return res.json(userToken)
  }
}

module.exports = SessionsController
