import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import UserModel from './models/userSchema'

dotenv.config()

const app = express()
const bcryptSalt = bcrypt.genSalt(10)

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
  await UserModel.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  })

  res.json({ name, email, password })
})

app.listen(3000, () => {
  console.log(`Server started on port http://localhost:${3000}/`)
})
