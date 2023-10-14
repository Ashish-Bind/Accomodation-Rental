import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../icons/Loading'
import { Map, Money } from '../icons/Icons'
import PriceFormatter from '../components/PriceFormatter'

function PlacesPage() {
  const [places, setPlaces] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data)
      setIsLoading(false)
    })
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
        {isLoading === true ? (
          <div className="w-24 h-24 mx-auto">
            <Loading />
          </div>
        ) : places.length > 0 ? (
          places.map((place) => {
            return (
              <Link
                to={`/account/places/${place._id}`}
                key={place._id}
                className="flex border border-gray-300 p-2 gap-2 rounded-lg hover:shadow-xl my-6"
              >
                <div className="grid lg:grid-cols-[15%_85%] grid-cols-1">
                  {place.photos.length > 0 && (
                    <img
                      className="object-center object-cover rounded-lg"
                      src={`http://localhost:3000/uploads/${place.photos[0]}`}
                      alt=""
                    />
                  )}
                  <div className="flex flex-col justify-between ml-4 gap-1">
                    <h2 className="text-2xl font-medium">{place.title}</h2>
                    <p className="flex gap-1 font-semibold">
                      <Map /> {place.address}
                    </p>
                    <p className="text-sm text-gray-400">
                      {place.description.slice(0, 250) + '...'}
                    </p>
                    <p className="flex gap-1 font-semibold">
                      <Money /> <PriceFormatter price={place.price} />
                    </p>
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="text-center">No Listing found</div>
        )}
      </div>
    </div>
  )
}

export default PlacesPage
