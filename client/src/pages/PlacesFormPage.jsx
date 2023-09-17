/* eslint-disable react/prop-types */
import { useState } from 'react'
import PhotosUploader from '../components/PhotosUploader'
import axios from 'axios'
import PerksLabel from '../components/PerksLabel'
import AccountNav from '../components/AccountNav'
import { Navigate } from 'react-router-dom'

function PlacesFormPage() {
  const classes = 'text-xl my-2 font-medium'
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

  async function addNewPlace(e) {
    e.preventDefault()
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    }
    await axios.post('/places', placeData)
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/account/places" />
  }

  return (
    <div>
      <AccountNav />
      <form action="" onSubmit={addNewPlace}>
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
        <div>
          <button className="primary ">Save</button>
        </div>
      </form>
    </div>
  )
}

export default PlacesFormPage
