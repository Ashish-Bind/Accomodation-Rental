import { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { differenceInCalendarDays, format } from 'date-fns'
import PriceFormatter from '../components/PriceFormatter'
import { Calender, Money, Moon, RightArrow } from '../icons/Icons'

function BookingPage() {
  const [bookings, setBookings] = useState(null)

  useEffect(() => {
    axios.get('/bookings').then((res) => setBookings(res.data))
  }, [])

  return (
    <div>
      <AccountNav />
      <h1 className="text-center font-semibold">
        {bookings?.length === 0 ? 'No Bookings found' : 'My Bookings'}
      </h1>
      <div>
        {bookings?.map((booking) => {
          return (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className="flex border border-gray-300 p-2 gap-2 rounded-lg hover:shadow-xl my-6"
            >
              <div className="grid lg:grid-cols-[15%_85%] grid-cols-1">
                {booking.place.photos.length > 0 && (
                  <img
                    className="object-center object-cover rounded-lg"
                    src={`http://localhost:3000/uploads/${booking.place.photos[0]}`}
                    alt=""
                  />
                )}
                <div className="flex flex-col justify-between p-2 gap-2 ml-2">
                  <h2 className="text-2xl font-medium ">
                    {booking.place.title}
                  </h2>

                  <div className="flex gap-3">
                    <p className="text-sm flex items-center">
                      <Calender />
                      <span className="font-semibold ">
                        {format(new Date(booking.checkIn), 'dd-MM-yyy')}
                      </span>
                    </p>
                    <p>
                      <RightArrow />
                    </p>
                    <p className="text-sm flex items-center">
                      <Calender />
                      <span className="font-semibold">
                        {format(new Date(booking.checkOut), 'dd-MM-yyy')}
                      </span>
                    </p>
                  </div>

                  <p className="flex gap-2">
                    <Moon />
                    <span className="font-semibold">
                      {differenceInCalendarDays(
                        new Date(booking.checkOut),
                        new Date(booking.checkIn)
                      )}{' '}
                    </span>
                    nights | <Money />
                    <PriceFormatter price={booking.totalPrice} />
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BookingPage
