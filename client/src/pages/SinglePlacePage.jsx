import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePlace } from '../context/PlacesContext'

function SinglePlacePage() {
  const { id } = useParams()
  const { singlePlace, setSinglePlace } = usePlace()

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/places/' + id).then((res) => {
      setSinglePlace(res.data)
    })
  }, [id])

  return <div>SinglePlacePage</div>
}

export default SinglePlacePage
