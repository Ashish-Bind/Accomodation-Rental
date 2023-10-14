import { Schema, model } from 'mongoose'

const placeSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'user' },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuest: Number,
  price: Number,
  booked: { type: Boolean, default: false },
  bookedBy: { type: Schema.Types.ObjectId, ref: 'user' },
})

const PlaceModel = model('place', placeSchema)

export default PlaceModel
