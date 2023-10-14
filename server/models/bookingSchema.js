import { Schema, model } from 'mongoose'

const bookingSchema = new Schema({
  place: { type: Schema.Types.ObjectId, required: true },
  bookedUser: { type: Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  maxGuest: { type: Number, required: true },
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
})

const bookingModel = model('bookings', bookingSchema)

export default bookingModel
