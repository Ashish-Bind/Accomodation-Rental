import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import { useEffect, useState } from 'react'
import axios from 'axios'

function PlacesPage() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places').then(({ data }) => setPlaces(data))
  }, [])

  return (
    <div>
      <AccountNav />
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
      <div className="m-2">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <div key={place._id} className="flex bg-gray-200 p-4 gap-2">
                <div className="w-32 grow shrink-0">
                  {place.photos.length > 0 && (
                    <img
                      src={`http://localhost:3000/uploads/${place.photos[1]}`}
                      alt=""
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-medium">{place.title}</h2>
                  <p>{place.description}</p>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default PlacesPage
