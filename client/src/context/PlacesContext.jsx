/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react'
import { ACTIONS_PLACES, placeReducer } from './reducers/placeReducer'

const PlaceContext = createContext()

export const usePlace = () => useContext(PlaceContext)

const initialState = {
  allPlaces: [],
  singlePlace: {},
  filteredPlaces: [],
  filters: {
    search: '',
  },
  searchBox: false,
}

function PlaceProvider({ children }) {
  const [state, dispatch] = useReducer(placeReducer, initialState)

  const getAllPlaces = (data) => {
    dispatch({ type: ACTIONS_PLACES.GET_ALL_PLACES, payload: data })
  }

  const setSinglePlace = (data) => {
    dispatch({ type: ACTIONS_PLACES.SET_SINGLE_PLACES, payload: data })
  }

  const updateFilterValue = (e) => {
    dispatch({
      type: ACTIONS_PLACES.SET_FILTER_VALUE,
      payload: { name: e.target.name, value: e.target.value },
    })
  }

  const setSearchBox = () => {
    dispatch({ type: ACTIONS_PLACES.SET_SEARCH_BOX })
  }

  useEffect(() => {
    dispatch({ type: ACTIONS_PLACES.FILTER_ITEMS })
  }, [state.filters])

  return (
    <PlaceContext.Provider
      value={{
        ...state,
        getAllPlaces,
        setSinglePlace,
        updateFilterValue,
        setSearchBox,
      }}
    >
      {children}
    </PlaceContext.Provider>
  )
}

export default PlaceProvider
