import { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import axios from 'axios'

function BookingPage() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios.get('/bookings').then((res) => setBookings(res.data))
  }, [])

  return (
    <div>
      <AccountNav />
      <h1 className="text-center">My Bookings</h1>
    </div>
  )
}

export default BookingPage
