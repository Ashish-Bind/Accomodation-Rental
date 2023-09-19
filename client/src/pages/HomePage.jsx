import axios from 'axios'
import { useEffect } from 'react'
import { usePlace } from '../context/PlacesContext'
import PriceFormatter from '../components/PriceFormatter'
import { Link } from 'react-router-dom'

function HomePage() {
  const { allPlaces, getAllPlaces } = usePlace()

  useEffect(() => {
    axios.get('/all-places').then((res) => {
      getAllPlaces([...res.data])
    })
  }, [])

  return (
    <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
      {allPlaces.length > 0 &&
        allPlaces.map((place) => {
          const address = place.address.split(',')
          const formattedAddress = `${address[0]}, ${
            address[address.length - 1]
          }`
          return (
            <Link
              to={`/place/${place._id}`}
              key={place._id}
              className="p-2 rounded-lg"
            >
              <div className="mb-2">
                <img
                  className="rounded-lg aspect-square object-cover"
                  src={`http://localhost:3000/uploads/${place.photos?.[0]}`}
                  alt={place.title}
                />
              </div>
              <h2 className="font-medium text-lg">{formattedAddress}</h2>
              <p className="truncatet font-normal text-sm text-gray-500">
                {place.title}
              </p>
              <p className="text-sm underline text-black">
                {<PriceFormatter price={place.price} />} per night
              </p>
            </Link>
          )
        })}
    </div>
  )
}

export default HomePage
