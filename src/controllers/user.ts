import { RequestHandler } from "express";
import { User } from "../models/User";
import { generateToken } from "../config/passport";

export const getAll: RequestHandler = async (req, res) => {
  const data = await User.findAll()
  const list: string[] = []

  data.map((user) => {
    list.push(user.email)
  })

  res.json({ users: list })
}

export const register: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    const hasUser = await User.findOne({
      where: { email, password }
    })

    if (!hasUser) {
      const newUser = await User.create({
        email,
        password
      })

      const token = generateToken({ id: newUser.id })
      res.status(201).json({ id: newUser.id, token })
    }
    else {
      res.json({ error: 'An error occurred at user creation' })
    }
  }
  else {
    res.json({ error: 'E-mail or password not given' })
  }
}

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    const user = await User.findOne({
      where: { email, password }
    })

    if (user) {
      const token = generateToken({ id: user.id })
      res.json({ status: true, token })
    }
  }
  else {
    res.json({ status: false })
  }
}