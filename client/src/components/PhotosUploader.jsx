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
      <div className="grid  gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo) => {
            return (
              <div key={photo} className="flex h-44">
                <img
                  className="rounded-xl object-cover w-full bg-center"
                  src={`http://localhost:3000/uploads/${photo}`}
                  alt={photo}
                />
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
