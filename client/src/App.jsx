import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import UserProvider from './context/UserContext'
import AccountPage from './pages/AccountPage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlaceProvider from './context/PlacesContext'
import SinglePlacePage from './pages/SinglePlacePage'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

function App() {
  return (
    <PlaceProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/places/new" element={<PlacesFormPage />} />
            <Route path="/account/places/:id" element={<PlacesFormPage />} />
            <Route path="/place/:id" element={<SinglePlacePage />} />
          </Route>
        </Routes>
      </UserProvider>
    </PlaceProvider>
  )
}

export default App
