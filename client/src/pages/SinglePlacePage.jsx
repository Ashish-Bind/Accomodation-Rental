import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { usePlace } from '../context/PlacesContext'
import { Left, Image, Map } from '../icons/Icons'
import { differenceInCalendarDays } from 'date-fns'
import PriceFormatter from '../components/PriceFormatter'
import { useUser } from '../context/UserContext'
import Loading from '../icons/Loading'

function SinglePlacePage() {
  const { id } = useParams()
  const { user } = useUser()
  const { singlePlace: place, setSinglePlace } = usePlace()

  let numNights = 0
  let totalPrice = 0

  const [showAllPhotos, setShowAllPhotos] = useState(false)

  const [loading, setLoading] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numGuest, setNumGuest] = useState(1)
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [redirect, setRedirect] = useState('')

  if (checkIn && checkOut) {
    numNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    totalPrice = numNights * place.price
  }

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/single-place/' + id).then((res) => {
      setSinglePlace(res.data)
    })
  }, [id])

  if (showAllPhotos) {
    return (
      <div className="mt-8 min-h-screen min-w-full p-8">
        <div className="sticky top-4 right-0">
          <button
            className="px-4 py-2 rounded-md mb-3 text-white sticky right-4 top-0"
            onClick={() => setShowAllPhotos(false)}
          >
            <Left />
          </button>
        </div>
        <div className="grid gap-2 grid-cols-2 mt-2">
          {place?.photos?.length > 0 &&
            place.photos.map((img) => {
              return (
                <div key={img}>
                  <img
                    src={'http://localhost:3000/uploads/' + img}
                    className="rounded-md"
                  />
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  async function bookPlace() {
    setLoading(true)
    const response = await axios.post('/booking', {
      placeId: id,
      checkIn,
      checkOut,
      numGuest,
      fullName,
      mobile,
      totalPrice,
    })

    const bookingId = response.data._id
    setLoading(false)
    setRedirect('/account/bookings/' + bookingId)
  }

  async function cancelBooking() {
    axios.post('/cancel-booking', { id: user.id, placeId: id })
    setRedirect('/')
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="mt-8 lg:mx-20 mx-6">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        className="font-semibold underline flex gap-1 auto-rows-min text-base"
        href={'https://maps.google.com/?q=' + place.address}
        target="_blank"
        rel="noreferrer"
      >
        <Map />
        {place.address}
      </a>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 rounded mt-2 relative">
        <img
          src={'http://localhost:3000/uploads/' + place.photos?.[0]}
          onClick={() => setShowAllPhotos(true)}
          className="aspect-auto object-cover rounded-2xl cursor-pointer"
        />
        <img
          src={'http://localhost:3000/uploads/' + place.photos?.[1]}
          onClick={() => setShowAllPhotos(true)}
          className="aspect-auto object-cover rounded-2xl cursor-pointer"
        />
        <button
          className="absolute right-4 bottom-4 px-2 py-2  rounded-md font-semibold flex items-center gap-2 text-white"
          onClick={() => setShowAllPhotos(true)}
        >
          <Image />
          Show more images
        </button>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr]  grid-cols-1 gap-2 mt-4">
        <div className="grid content-around">
          <div>
            <h2 className="font-semibold underline text-lg">Description</h2>
            <p className="text-gray-500 text-base break-all">
              {place.description}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium text-base">Check In:</span>{' '}
              {place.checkIn}
            </p>
            <p>
              <span className="font-medium text-base">Check Out:</span>{' '}
              {place.checkOut}
            </p>
            <p>
              <span className="font-medium text-base">No of Guests:</span>{' '}
              {place.maxGuest}
            </p>
          </div>
        </div>
        {loading ? (
          <div className="w-40 place-self-center text-primary">
            <Loading />
            <h1>Please do not refresh the page.</h1>
          </div>
        ) : (
          <div className=" py-2 px-4 rounded-md shadow-2xl place-items-center">
            {place.booked ? (
              place.bookedBy === user.id ? (
                <button
                  className="px-2 py-1 w-full rounded-xl text-white text-base my-2"
                  onClick={cancelBooking}
                >
                  Cancel Booking
                </button>
              ) : (
                <div>Already booked by someone</div>
              )
            ) : (
              <>
                <div className="text-center">
                  <strong>Price :</strong>{' '}
                  <PriceFormatter price={place.price} /> per night
                </div>
                <div className="border-gray-300 border rounded-md">
                  <div className="px-3 py-1 my-1 rounded-md flex items-center ">
                    <label htmlFor="check-in" className="font-bold">
                      Check In Date :
                    </label>
                    <input
                      type="date"
                      name=""
                      id="check-in"
                      className="bg-transparent p-2"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div className="px-3 py-1 my-1 rounded-md">
                    <label htmlFor="check-out" className="font-bold">
                      Check Out Date :
                    </label>
                    <input
                      type="date"
                      name=""
                      id="check-out"
                      className="bg-transparent p-2"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                  <div className="px-3 py-1 my-1 rounded-md">
                    <label htmlFor="guest" className="font-bold">
                      No of Guest:
                    </label>
                    <input
                      type="number"
                      name=""
                      id="guest"
                      className="bg-transparent"
                      max={place.maxGuest}
                      value={numGuest}
                      onChange={(e) => setNumGuest(e.target.value)}
                    />
                  </div>
                  {numNights > 0 && (
                    <>
                      <div className="px-4 py-2 my-1 rounded-md">
                        <label htmlFor="guest" className="font-bold">
                          Enter your full Name:
                        </label>
                        <input
                          type="text"
                          name=""
                          id="guest"
                          className="bg-transparent"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="px-4 py-2 my-1 rounded-md">
                        <label htmlFor="guest" className="font-bold">
                          Enter your Mobile Number:
                        </label>
                        <input
                          type="number"
                          name=""
                          id="guest"
                          className="bg-transparent"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
                <button
                  className="px-2 py-1 w-full rounded-xl text-white text-base my-2"
                  onClick={bookPlace}
                >
                  Book Now
                </button>
                {numNights > 0 && (
                  <span>
                    Total price will be ₹ <PriceFormatter price={totalPrice} />
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <p className="font-semibold underline text-lg">Extra Information:</p>
      <p className="text-gray-500 text-sm break-all">{place.extraInfo}</p>
    </div>
  )
}

export default SinglePlacePage
