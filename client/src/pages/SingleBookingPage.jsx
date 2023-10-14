import { useParams } from 'react-router-dom'

function SingleBookingPage() {
  const { id } = useParams()
  return <div>Bookings {id}</div>
}

export default SingleBookingPage
