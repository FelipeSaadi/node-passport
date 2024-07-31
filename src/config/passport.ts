import passport from "passport"
import { BasicStrategy } from "passport-http"
import { User, UserInstance } from "../models/User"
import { RequestHandler } from "express"

const notAuthorizedJson = { status: 401, message: 'Not allowed' }

passport.use(new BasicStrategy(async (email, password, done) => {
  if (email && password) {
    const user = await User.findOne({
      where: { email, password }
    })

    if (user) {
      return done(null, user)
    }
  }

  return done(notAuthorizedJson, false)
}))

export const privateRoute: RequestHandler = (req, res, next) => {
  passport.authenticate('basic', (err: Error, user: UserInstance) => {
    return user ? next() : next(notAuthorizedJson)
  })(req, res, next)
}

export default passport