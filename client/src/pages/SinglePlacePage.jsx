import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePlace } from '../context/PlacesContext'
import { Left, Image, Map } from '../icons/Icons'

function SinglePlacePage() {
  const { id } = useParams()
  const { singlePlace: place, setSinglePlace } = usePlace()

  const [showAllPhotos, setShowAllPhotos] = useState(false)

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
      <div className="mt-8 min-h-screen min-w-full p-4 ">
        <div>
          <button
            className="px-4 py-2 rounded-md mb-3 text-white fixed"
            onClick={() => setShowAllPhotos(false)}
          >
            <Left />
          </button>
        </div>
        <div className="grid gap-4 grid-cols-2 mt-14">
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

  return (
    <div className="mt-8">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        className="font-semibold underline flex gap-2 auto-rows-min"
        href={'https://maps.google.com/?q=' + place.address}
        target="_blank"
        rel="noreferrer"
      >
        <Map />
        {place.address}
      </a>
      <div className="relative">
        <div className="grid grid-cols-[2fr_1fr] rounded-md overflow-hidden">
          <div className="row-span-2 m-2">
            <img
              src={'http://localhost:3000/uploads/' + place.photos?.[0]}
              className="aspect-square object-cover"
            />
          </div>
          <div className="m-2">
            <img
              src={'http://localhost:3000/uploads/' + place.photos?.[1]}
              className="aspect-square object-cover"
            />
          </div>
          <div className="m-2">
            <img
              src={'http://localhost:3000/uploads/' + place.photos?.[2]}
              className="aspect-square object-cover"
            />
          </div>
        </div>
        <button
          className="absolute right-4 bottom-4 px-2 py-2  rounded-md font-semibold flex items-center gap-2 text-white"
          onClick={() => setShowAllPhotos(true)}
        >
          <Image />
          Show more images
        </button>
      </div>
      <div className="">
        <h2 className="font-semibold underline">Description</h2>
        <p>{place.description}</p>
      </div>
    </div>
  )
}

export default SinglePlacePage
