import passport from "passport"
import { BasicStrategy } from "passport-http"
import { Strategy as JWTStrategy } from "passport-jwt"
import { User, UserInstance } from "../models/User"
import { RequestHandler } from "express"
import jwt from 'jsonwebtoken'
import { ExtractJwt } from "passport-jwt"

const notAuthorizedJson = { status: 401, message: 'Not allowed' }

// passport.use(new BasicStrategy(async (email, password, done) => {
//   if (email && password) {
//     const user = await User.findOne({
//       where: { email, password }
//     })

//     if (user) {
//       return done(null, user)
//     }
//   }

//   return done(notAuthorizedJson, false)
// }))

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done) => {
  const user = await User.findByPk(payload.id)

  if (user) {
    return done(null, user)
  }
  else {
    return done(notAuthorizedJson, false)
  }
}))

export const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_SECRET as string)
}

export const privateRoute: RequestHandler = (req, res, next) => {
  passport.authenticate('jwt', (err: Error, user: UserInstance) => {
    return user ? next() : next(notAuthorizedJson)
  })(req, res, next)
}

export default passport