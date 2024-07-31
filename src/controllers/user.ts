import { RequestHandler } from "express";
import { User } from "../models/User";

export const getAll: RequestHandler = async (req, res) => {
  const data = await User.findAll()
  const list: string[] = []

  data.map((user) => {
    list.push(user.email)
  })

  res.json({ users: list })
}