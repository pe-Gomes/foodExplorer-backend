const knex = require("../database/knex");
const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError");

class UsersController {
  async create(req, res){
    const { name, email, password } = req.body;
    
    const users = await knex("users").select("email");
    const userExists = await users.some( user => user.email === email);

    if (userExists) {
      throw new AppError("Este e-mail já está sendo utilizado.")
    }

    const passwordLength = password.length;

    if (passwordLength < 6) {
      throw new AppError("A senha, no mínimo, deve ter 6 caracteres.")
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json();
  } 
}

module.exports = UsersController;