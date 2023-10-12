import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import imageDownloader from 'image-downloader'
import UserModel from './models/userSchema.js'
import PlaceModel from './models/placeSchema.js'
import BookingModel from './models/bookingSchema.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import multer from 'multer'
import { renameSync } from 'fs'
import bookingModel from './models/bookingSchema.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const app = express()
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'asfhxi1o2j2dsgnk24jaj7dfs12'

app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json())
app.use(cookieParser())
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
        { email: user.email, id: user._id, name: user.name },
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

app.get('/profile', (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) {
        throw error
      }
      res.json(userData)
    })
  } else {
    res.json(null)
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  })
  res.json(newName)
})

const photMiddleware = multer({ dest: 'uploads' })
app.post('/upload', photMiddleware.array('images', 100), (req, res) => {
  const uploadedFiles = []
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]
    const parts = originalname.split('.')
    const newPath = path + '.' + parts[parts.length - 1]
    renameSync(path, newPath)
    uploadedFiles.push(newPath.replace(`uploads\\`, ''))
  }
  res.json(uploadedFiles)
})

app.post('/places', (req, res) => {
  const { token } = req.cookies
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) {
      throw error
    }
    const placeDoc = await PlaceModel.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    })
    res.json(placeDoc)
  })
})

app.get('/user-places', (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      throw err
    }
    const { id } = userData
    res.json(await PlaceModel.find({ owner: id }))
  })
})

app.get('/places/:id', async (req, res) => {
  const { id } = req.params
  const foundPlace = await PlaceModel.findById(id)
  res.json(foundPlace)
})

app.put('/places', async (req, res) => {
  // prettier-ignore
  const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests:maxGuest, price } = req.body
  const { token } = req.cookies
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDoc = await PlaceModel.findById(id)
    if (err) {
      throw err
    }
    if (userData.id === placeDoc.owner.toString()) {
      // prettier-ignore
      placeDoc.set({ title, address, photos : addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuest, price})
      await placeDoc.save()
      res.json('ok')
    }
  })
})

app.get('/all-places', async (req, res) => {
  res.json(await PlaceModel.find())
})

app.get('/single-place/:id', async (req, res) => {
  const { id } = req.params
  const foundPlace = await PlaceModel.findById(id)
  res.json(foundPlace)
})

app.post('/booking', async (req, res) => {
  const { placeId, checkIn, checkOut, numGuest, fullName, mobile, totalPrice } =
    req.body

  const bookingDoc = await bookingModel.create({
    place: placeId,
    checkIn,
    checkOut,
    maxGuest: numGuest,
    name: fullName,
    mobile,
    totalPrice,
  })

  res.json(bookingDoc)
})

app.listen(3000, () => {
  console.log(`Server started on port http://localhost:${3000}/`)
})
