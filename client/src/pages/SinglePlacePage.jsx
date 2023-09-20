import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePlace } from '../context/PlacesContext'

function SinglePlacePage() {
  const { id } = useParams()
  const { singlePlace: place, setSinglePlace } = usePlace()

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/single-place/' + id).then((res) => {
      setSinglePlace(res.data)
    })
  }, [id])

  return <div>{place.title}</div>
}

export default SinglePlacePage
