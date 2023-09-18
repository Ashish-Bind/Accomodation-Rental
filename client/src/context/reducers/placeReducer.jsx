export const ACTIONS_PLACES = {
  GET_ALL_PLACES: 'get-all-places',
}

export const placeReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS_PLACES.GET_ALL_PLACES: {
      return payload
    }

    default: {
      return state
    }
  }
}
