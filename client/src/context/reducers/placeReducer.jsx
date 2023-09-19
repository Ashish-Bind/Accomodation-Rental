export const ACTIONS_PLACES = {
  GET_ALL_PLACES: 'get-all-places',
  SET_SINGLE_PLACES: 'set-single-place',
}

export const placeReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS_PLACES.GET_ALL_PLACES: {
      return { ...state, allPlaces: payload }
    }

    case ACTIONS_PLACES.SET_SINGLE_PLACES: {
      return { ...state, singlePlace: payload }
    }

    default: {
      return state
    }
  }
}
