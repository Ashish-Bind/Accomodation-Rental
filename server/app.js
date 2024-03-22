import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import imageDownloader from 'image-downloader'
import nodemailer from 'nodemailer'
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
const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
})

dotenv.config()

const app = express()
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = process.env.JWT_SECRET
function getUserFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, async (err, userData) => {
      if (err) reject(err)
      resolve(userData)
    })
  })
}

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
      res.status(422).json('Incorrect Password')
    }
  } else {
    res.status(404).json('No User Found')
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
  const foundPlace = await PlaceModel.findById(id).populate(
    'owner',
    '-password'
  )
  res.json(foundPlace)
})

app.post('/booking', async (req, res) => {
  const user = await getUserFromToken(req)
  const { placeId, checkIn, checkOut, numGuest, fullName, mobile, totalPrice } =
    req.body

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '666e7dd8d7f675',
      pass: 'b5e636d1a8c0a6',
    },
  })

  const bookingDoc = await bookingModel.create({
    place: placeId,
    checkIn,
    checkOut,
    maxGuest: numGuest,
    name: fullName,
    mobile,
    totalPrice,
    bookedUser: user.id,
  })

  const bookedAccomodation = await PlaceModel.findByIdAndUpdate(
    bookingDoc.place,
    {
      booked: true,
      bookedBy: user.id,
    }
  )
  const hostInfo = await UserModel.findById(bookedAccomodation.owner)

  const info1 = await transport.sendMail({
    from: '"StayWise 🏢" <business@staywise.com>',
    to: user.email,
    subject: 'Accomodation booked Successfully',
    html: `
      <h1>Your booking is Successful</h1>
      <p>Booked apartment <i><b>${bookedAccomodation.title}</b></i> successfully</p>
      <ul>
        <li>From: ${checkIn}</li>
        <li>To: ${checkOut}</li>
      </ul>
      <p>Total Price is to pay is <b>₹ ${totalPrice}</b></p>
      <hr>
      <p>Host Details</p>
      <ul>
        <li>Name: ${hostInfo.name}</li>
        <li>Email: ${hostInfo.email}</li>
        </ul>
      <hr>
      <p>You can contact the owner for further assistance</p>
    `,
  })

  const info2 = await transport.sendMail({
    from: '"StayWise 🏢" <business@staywise.com>',
    to: hostInfo.email,
    subject: 'Your Accomodation is Rented',
    html: `
      <h1>Your Accomodation is rented Successfully by <u>${fullName}</u></h1>
      <p>Booked apartment <i><b>${bookedAccomodation.title}</b></i> successfully</p>
      <hr>
      <p>Check-in, Check-out and No. of Guests
      <ul>
        <li>From: ${checkIn}</li>
        <li>To: ${checkOut}</li>
        <li>Guests: ${numGuest}</li>
      </ul>
      <p>Total Price to recieve is <b>₹ ${totalPrice}</b></p>
      <hr>
      <p>You can contact by <small>+</small>91 <u>${mobile}</u> with below details</p>
      <ul>
        <li>Name: <b>${user.name}</b></li>
        <li>Email: <b>${user.email}</b></li>
      </ul>
    `,
  })

  console.log('Booking Log')
  console.log('Message sent: %s', info1.messageId)
  console.log('Message sent: %s', info2.messageId)
  console.log('--------------')

  res.json(bookingDoc)
})

app.post('/cancel-booking', async (req, res) => {
  const user = await getUserFromToken(req)
  const { id, placeId } = req.body
  const cancelledPlace = await PlaceModel.findByIdAndUpdate(placeId, {
    booked: false,
    bookedBy: null,
  })
  const bookedPlace = await BookingModel.findOneAndRemove({
    place: placeId,
    bookedUser: id,
  })
  const hostInfo = await UserModel.findById(cancelledPlace.owner)

  const info1 = await transport.sendMail({
    from: '"StayWise 🏢" <business@staywise.com>',
    to: user.email,
    subject: 'Accomodation cancelled Successfully',
    html: `
      <h1>Your booking is Cancelled</h1>
      <p>Apartment <i><b>${cancelledPlace.title}</b></i> cancelled successfully</p>
      <p>You can contact the owner for further to update them</p>
      <ul>
        <li>Name: ${hostInfo.name}</li>
        <li>Email: ${hostInfo.email}</li>
        </ul>
      <hr>
    `,
  })

  const info2 = await transport.sendMail({
    from: '"StayWise 🏢" <business@staywise.com>',
    to: hostInfo.email,
    subject: 'Your Accomodation is Cancelled',
    html: `
      <h1>Your Accomodation is cancelled by <u>${user.name}</u></h1>
      <p>Cancelled apartment <i><b>${cancelledPlace.title}</b></i> successfully</p>
      <hr>
      <p>Please enquire with renter for any issue</p>
      <ul>
        <li>Name: <b>${user.name}</b></li>
        <li>Email: <b>${user.email}</b></li>
      </ul>
    `,
  })

  console.log('Cancellation Log')
  console.log('Message sent: %s', info1.messageId)
  console.log('Message sent: %s', info2.messageId)
  console.log('--------------')

  res.json({ cancelledPlace, hostInfo, user })
})

app.get('/bookings', async (req, res) => {
  const userData = await getUserFromToken(req)
  const foundBookings = await BookingModel.find({
    bookedUser: userData.id,
  }).populate('place')

  res.json(foundBookings)
})

app.post('/cancel-booking/single', async (req, res) => {
  const user = await getUserFromToken(req)
  const { id, placeId } = req.body
  const bookedPlace = await BookingModel.findByIdAndDelete(placeId)
  const cancelledPlace = await PlaceModel.findByIdAndUpdate(bookedPlace.place, {
    booked: false,
    bookedBy: null,
  })
  const hostInfo = await UserModel.findById(cancelledPlace.owner)

  const info1 = await transport.sendMail({
    from: '"StayWise 🏢" <business@staywise.com>',
    to: user.email,
    subject: 'Accomodation cancelled Successfully',
    html: `
      <h1>Your booking is Cancelled</h1>
      <p>Apartment <i><b>${cancelledPlace.title}</b></i> cancelled successfully</p>
      <p>You can contact the owner for further to update them</p>
      <ul>
        <li>Name: ${hostInfo.name}</li>
        <li>Email: ${hostInfo.email}</li>
        </ul>
      <hr>
    `,
  })

  const info2 = await transport.sendMail({
    from: '"StayWise 🏢" <business@staywise.com>',
    to: hostInfo.email,
    subject: 'Your Accomodation is Cancelled',
    html: `
      <h1>Your Accomodation is cancelled by <u>${user.name}</u></h1>
      <p>Cancelled apartment <i><b>${cancelledPlace.title}</b></i> successfully</p>
      <hr>
      <p>Please enquire with renter for any issue</p>
      <ul>
        <li>Name: <b>${user.name}</b></li>
        <li>Email: <b>${user.email}</b></li>
        
      </ul>
    `,
  })

  console.log('Cancellation Log')
  console.log('Message sent: %s', info1.messageId)
  console.log('Message sent: %s', info2.messageId)
  console.log('--------------')

  res.json({ cancelledPlace, hostInfo, user })
})

app.listen(3000, () => {
  console.log(`Server started on port http://localhost:${3000}/`)
})
