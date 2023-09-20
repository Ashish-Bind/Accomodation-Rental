import axios from 'axios'
import { useEffect } from 'react'
import { usePlace } from '../context/PlacesContext'
import PriceFormatter from '../components/PriceFormatter'
import { Link } from 'react-router-dom'
import NotFound from '../icons/NotFound'

function HomePage() {
  const { filteredPlaces, getAllPlaces } = usePlace()

  useEffect(() => {
    axios.get('/all-places').then((res) => {
      getAllPlaces([...res.data])
    })
  }, [])

  return filteredPlaces.length > 0 ? (
    <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
      {filteredPlaces.map((place) => {
        const address = place.address.split(',')
        const formattedAddress = `${address[0]}, ${address[address.length - 1]}`
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
  ) : (
    <div className="flex flex-col items-center col-span-4 mx-auto mt-20 text-primary">
      <NotFound />
      <p className="font-semibold text-lg">No Result Found</p>
    </div>
  )
}

export default HomePage
