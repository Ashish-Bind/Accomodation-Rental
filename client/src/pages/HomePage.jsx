import axios from 'axios'
import { useEffect, useState } from 'react'
import { usePlace } from '../context/PlacesContext'
import PriceFormatter from '../components/PriceFormatter'
import { Link } from 'react-router-dom'
import NotFound from '../icons/NotFound'
import Loading from '../icons/Loading'

function HomePage() {
  const { filteredPlaces, getAllPlaces } = usePlace()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/all-places').then((res) => {
      getAllPlaces([...res.data])
    })
    setLoading(false)
  }, [])

  if (loading === true) {
    return (
      <div className="flex flex-col items-center w-20 col-span-4 mx-auto mt-20 text-primary">
        <Loading />
        <p className="font-semibold text-lg">Loading...</p>
      </div>
    )
  }

  return filteredPlaces.length > 0 ? (
    <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
      {filteredPlaces.map((place) => {
        const address = place.address.split(',')
        const formattedAddress = `${address[0]}, ${address[address.length - 1]}`
        return (
          <Link
            to={`/place/${place._id}`}
            key={place._id}
            className="p-2 rounded-lg border border-gray-300 hover:scale-105 transition-all shadow-lg"
          >
            <div className="mb-2">
              <img
                className="rounded-lg aspect-square object-cover"
                src={`http://localhost:3000/uploads/${place.photos?.[0]}`}
                alt={place.title}
              />
            </div>
            <h2 className="font-semibold text-xl">{formattedAddress}</h2>
            <p className="truncatet font-normal text-sm text-gray-500">
              {place.title.slice(0, 40)}...
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
      <p className="font-semibold text-lg">No Result Found</p>
    </div>
  )
}

export default HomePage
