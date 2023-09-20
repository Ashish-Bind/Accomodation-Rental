export const ACTIONS_PLACES = {
  GET_ALL_PLACES: 'get-all-places',
  SET_SINGLE_PLACES: 'set-single-place',
  SET_FILTER_VALUE: 'set-filter-value',
  FILTER_ITEMS: 'filter-items',
}

export const placeReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS_PLACES.GET_ALL_PLACES: {
      return { ...state, allPlaces: payload, filteredPlaces: payload }
    }

    case ACTIONS_PLACES.SET_SINGLE_PLACES: {
      return { ...state, singlePlace: payload }
    }

    case ACTIONS_PLACES.SET_FILTER_VALUE: {
      return {
        ...state,
        filters: {
          ...state.filters,
          [payload.name]: payload.value,
        },
      }
    }

    case ACTIONS_PLACES.FILTER_ITEMS: {
      let tempPlaces = [...state.allPlaces]
      if (state.filters.search) {
        tempPlaces = tempPlaces.filter((place) => {
          return place.address
            .toLowerCase()
            .includes(state.filters.search.toLowerCase())
        })
      }
      return { ...state, filteredPlaces: tempPlaces }
    }

    default: {
      return state
    }
  }
}
