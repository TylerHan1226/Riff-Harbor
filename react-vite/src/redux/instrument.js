
// Action Creators
export const LOAD_ALL_INSTRUMENTS = 'instrument/LOAD_ALL_INSTRUMENTS'


// Action Types
export const loadAllInstruments = (instruments) => {
    return {
        type: LOAD_ALL_INSTRUMENTS,
        instruments
    }
}


// Get All Instruments Thunk
export const getAllInstrumentsThunk = () => async (dispatch) => {
    const res = await fetch('/api/instruments')
    if (!res.ok) {
        throw new Error('Failed to fetch all instruments')
    }
    const instruments = await res.json()
    if (instruments.errors) {
        return instruments.errors
    }
    dispatch(loadAllInstruments(instruments))
    return instruments
}


//instrument Reducer
export const instrumentReducer = (state ={}, action) => {
    switch (action.type) {
        case LOAD_ALL_INSTRUMENTS: {
            return {...state, ...action.instruments}
        }
        default:
            return state
    }
}