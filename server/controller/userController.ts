import User from "../model/userModel";

async function registration(newLogin: string, newPassword: string):Promise<number> {
  try {
    if (await User.findOne({ attributes: ["login"], where: { login: newLogin } }) !== null) {
      return 400
    } else {
      await User.create({ login: newLogin, password: newPassword })
      return 201
    }
  } catch(e) {
    return 500
  }
}

async function authentication(userLogin: string):Promise< object | number > {
  try {
    const result = await User.findOne({ attributes: ["login", "password"], where: { login: userLogin } })
    if (result !== null) {
      return result.dataValues
    } else {
      return 404
    }
  } catch(e) {
    return 500
  }
}

export { registration, authentication }