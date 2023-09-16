import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PerksLabel from '../components/PerksLabel'
import PhotosUploader from '../components/PhotosUploader'

function PlacesPage() {
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)

  const { action } = useParams()
  const classes = 'text-xl my-2 font-medium'

  return (
    <div>
      {action !== 'new' && (
        <div className="add-new-place text-center">
          <Link
            className="inline-flex gap-3 bg-primary text-white py-2 px-6 rounded-full"
            to="/account/places/new"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form action="" onSubmit={(e) => e.preventDefault()}>
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
            <PhotosUploader
              photoLink={photoLink}
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
              setPhotoLink={setPhotoLink}
            />
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
      )}
    </div>
  )
}

export default PlacesPage
