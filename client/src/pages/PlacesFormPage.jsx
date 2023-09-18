/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import PhotosUploader from '../components/PhotosUploader'
import axios from 'axios'
import PerksLabel from '../components/PerksLabel'
import AccountNav from '../components/AccountNav'
import { Navigate, useParams } from 'react-router-dom'

function PlacesFormPage() {
  const classes = 'text-xl my-2 font-medium'

  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [redirect, setRedirect] = useState(false)
  const [price, setPrice] = useState(2500)

  useEffect(() => {
    if (!id) {
      return
    }

    axios.get('/places/' + id).then((res) => {
      const { data } = res
      setTitle(data.title)
      setAddress(data.address)
      setAddedPhotos(data.photos)
      setDescription(data.description)
      setPerks(data.perks)
      setExtraInfo(data.extraInfo)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
      setPrice(data.price)
    })
  }, [id])

  async function savePlace(e) {
    e.preventDefault()
    // prettier-ignore
    const placeData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price}
    if (id) {
      // update place
      await axios.put('/places', { id, ...placeData })
    } else {
      // new place
      await axios.post('/places', placeData)
    }
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/account/places" />
  }

  return (
    <div>
      <AccountNav />
      <form action="" onSubmit={savePlace}>
        <h2 className={classes}>Title</h2>
        <input
          type="text"
          placeholder="for example: BeachSide Stacation"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className={classes}>Address</h2>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <h2 className={classes}>Photos</h2>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <h2 className={classes}>Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <h2 className={classes}>Perks</h2>
        <p className="text-gray-500 text-sm">
          select the perks available for your place
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 my-2">
          <PerksLabel selected={perks} onChange={setPerks} />
        </div>
        <h2 className={classes}>Extra information</h2>
        <p className="text-gray-500 text-sm">house rules etc.</p>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        ></textarea>
        <h2 className={classes}>Check in & out timing</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="my-1">Check In Time</h3>
            <input
              type="text"
              placeholder="for example: 14"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="my-1">Check Out Time</h3>
            <input
              type="text"
              placeholder="for example: 7"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="my-1">Max no. of Guests</h3>
            <input
              type="number"
              placeholder="for example: 2"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <h2 className={classes}>Pricing</h2>
        <p className="text-gray-500 text-sm">price per nights.</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div>
          <button className="primary ">Save</button>
        </div>
      </form>
    </div>
  )
}

export default PlacesFormPage
