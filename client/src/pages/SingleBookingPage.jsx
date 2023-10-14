import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Calender, Map, Money, Moon, RightArrow } from '../icons/Icons'
import { differenceInCalendarDays, format } from 'date-fns'
import PriceFormatter from '../components/PriceFormatter'
import { useUser } from '../context/UserContext'
import Loading from '../icons/Loading'

function SingleBookingPage() {
  const { id } = useParams()
  const { user } = useUser()
  const [singleBooking, setSingleBooking] = useState(null)
  const [redirect, setRedirect] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((res) => {
        const foundBooking = res.data.find(({ _id }) => _id === id)
        if (foundBooking) {
          setSingleBooking(foundBooking)
        }
      })
    }
  }, [id])

  async function cancelBooking() {
    setLoading(true)
    await axios.post('/cancel-booking/single', { id: user.id, placeId: id })
    setLoading(false)
    setRedirect('/account/bookings')
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  if (!singleBooking) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="mt-8 lg:mx-20 mx-6">
      <h1 className="text-2xl">{singleBooking.place.title}</h1>
      <a
        className="font-semibold underline flex gap-1 auto-rows-min text-base"
        href={'https://maps.google.com/?q=' + singleBooking.place.address}
        target="_blank"
        rel="noreferrer"
      >
        <Map />
        {singleBooking.place.address}
      </a>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 rounded mt-2 relative">
        <div className="flex object-cover w-full">
          <img
            src={
              'http://localhost:3000/uploads/' + singleBooking.place.photos?.[0]
            }
            className="rounded-2xl object-cover"
          />
        </div>
        <div className="flex ">
          <img
            src={
              'http://localhost:3000/uploads/' + singleBooking.place.photos?.[1]
            }
            className=" object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between border border-gray-400 rounded-lg p-2 gap-3 my-2">
        <h2 className="text-xl font-light underline text-gray-600">
          Booking Information
        </h2>

        <div className="flex gap-2">
          <p className="text-sm flex items-center">
            <Calender />
            <span className="font-semibold ">
              {format(new Date(singleBooking.checkIn), 'dd-MM-yyy')}
            </span>
          </p>
          <p>
            <RightArrow />
          </p>
          <p className="text-sm flex items-center">
            <Calender />
            <span className="font-semibold">
              {format(new Date(singleBooking.checkOut), 'dd-MM-yyy')}
            </span>
          </p>
        </div>

        <p className="flex gap-2">
          <Moon />
          <span className="font-semibold">
            {differenceInCalendarDays(
              new Date(singleBooking.checkOut),
              new Date(singleBooking.checkIn)
            )}{' '}
          </span>
          nights | <Money />
          <PriceFormatter price={singleBooking.totalPrice} />
        </p>
      </div>
      <button className="text-white w-full rounded-lg" onClick={cancelBooking}>
        {loading ? (
          <div className="w-14 mx-auto">
            <Loading color={'#fff'} />
          </div>
        ) : (
          <div className="my-2mx-auto">Cancel Booking</div>
        )}
      </button>
    </div>
  )
}

export default SingleBookingPage
