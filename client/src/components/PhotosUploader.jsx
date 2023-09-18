/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState } from 'react'

function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState('')

  async function addImageByURL() {
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    })
    onChange((prevImages) => {
      return [...prevImages, filename]
    })
    setPhotoLink('')
  }

  async function uploadPhoto(ev) {
    const files = ev.target.files
    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append('images', files[i])
    }
    const { data: filenames } = await axios.post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    onChange((prevImages) => {
      return [...prevImages, ...filenames]
    })
  }

  function removePhoto(imageName) {
    onChange([...addedPhotos.filter((photo) => photo !== imageName)])
  }

  function setMainImage(imageName) {
    const mainImage = addedPhotos.filter((photo) => photo !== imageName)
    onChange([imageName, ...mainImage])
  }

  return (
    <>
      <div className="flex">
        <input
          type="text"
          placeholder="add using link ...jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-gray-200 px-4 py-2 rounded-full"
          onClick={addImageByURL}
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo) => {
            return (
              <div key={photo} className="flex h-44 relative">
                <img
                  className="rounded-lg object-cover w-full bg-center"
                  src={`http://localhost:3000/uploads/${photo}`}
                  alt={photo}
                />
                <button
                  className="absolute bottom-2 left-2 bg-black bg-opacity-40 p-2 rounded-full cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    setMainImage(photo)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={photo === addedPhotos[0] ? 'white' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
                <button
                  className="absolute bottom-2 right-2 bg-black bg-opacity-40 p-2 rounded-full cursor-pointer"
                  onClick={(ev) => removePhoto(photo, ev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            )
          })}
        <label className="flex gap-2 items-center justify-center border bg-transparent rounded-2xl p-4 cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  )
}

export default PhotosUploader
