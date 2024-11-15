import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const generateAccessToken = ( login: string, role: string ): string | undefined => {
  const payload: object = { login, role }
  const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET
  if (typeof accessTokenSecret === "string") {
    return jwt.sign(payload, accessTokenSecret, {expiresIn: '30m'})
  } else {
    return undefined
  }
}

const verifyToken = ( token: string, secret: string ): string | JwtPayload => {
  return jwt.verify(token, secret);
}

export {generateAccessToken, verifyToken}