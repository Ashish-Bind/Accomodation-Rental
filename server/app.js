import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from './models/userSchema.js'

dotenv.config()

const app = express()
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'asfhxi1o2j2dsgnk24jaj7dfs12'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('connected to database'))

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })

    res.json(user)
  } catch (error) {
    res.status(422).json(error)
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  if (user !== null) {
    if (bcrypt.compareSync(password, user.password)) {
      jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error
          res.cookie('token', token).json(user)
        }
      )
    } else {
      res.json('pass no')
    }
  } else {
    res.json('No user found')
  }
})

app.listen(3000, () => {
  console.log(`Server started on port http://127.0.0.1:${3000}/`)
})
