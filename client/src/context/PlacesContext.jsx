import { createContext, useContext, useReducer } from 'react'
import { ACTIONS_PLACES, placeReducer } from './reducers/placeReducer'

const PlaceContext = createContext()

export const usePlace = () => useContext(PlaceContext)

const initialState = []

function PlaceProvider({ children }) {
  const [state, dispatch] = useReducer(placeReducer, initialState)

  const getAllPlaces = (data) => {
    dispatch({ type: ACTIONS_PLACES.GET_ALL_PLACES, payload: data })
  }

  return (
    <PlaceContext.Provider value={{ state, getAllPlaces }}>
      {children}
    </PlaceContext.Provider>
  )
}

export default PlaceProvider
