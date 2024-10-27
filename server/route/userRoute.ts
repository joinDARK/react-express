import express, { Router } from "express";
import { check, Result, ValidationError, validationResult } from "express-validator";
import bcrypt from "bcrypt"
import { registration, authentication } from "../controller/userController";
import { generateAccessToken } from "../utils/generatorsJWT";

const userRouter: Router = express.Router() // Инициализация роута

userRouter.post(
  "/reg",
  check("login", "Логин не может быть пустым").trim().notEmpty(),
  check("password", "Пароль должен быть от 8 до 14 символов").isLength({ min: 8, max: 14 }),
  async (req, res) => {
    const errors: Result<ValidationError> = validationResult(req)
    if(!errors.isEmpty()) {
      res.status(400).json(errors)
    } else {
      const { login, password } = req.body
      const hashPassword: string = bcrypt.hashSync(password, 7)
      const result: number = await registration(login, hashPassword)
      switch (result) {
        case 400:
          res.status(result).json("Такой пользователь уже зарегистрирован")
          break
        
        case 201:
          res.status(result).json("Успешно зарегистрован")
          break
          
        default:
          res.status(result).json("Произошла ошибка")
          break
      }
    }
  }
)

userRouter.post(
  "/login", 
  async (req, res) => {
    const { login, password } = req.body
    const result:object | number = await authentication(login)
    
    if (typeof result === 'object') {
      const { login: userLogin, password: userPassword } = result as {login: string, password: string} // приведение типа
      const validPassword = bcrypt.compareSync(password, userPassword)
      if (!validPassword) {
        res.status(404).json("Invalid Password")
      } else {
        const token: string | undefined = generateAccessToken(userLogin, userPassword)
        res.cookie("token", token, {httpOnly: true})
        res.status(200).json({ userLogin, userPassword })
      }
    } else {
      res.status(404).json("Invalid Login")
    }
  }
)

export default userRouter