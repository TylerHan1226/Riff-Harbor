
// Action Creators
export const LOAD_ALL_INSTRUMENTS = 'instrument/LOAD_ALL_INSTRUMENTS'
export const LOAD_ONE_INSTRUMENT = 'instrument/LOAD_ONE_INSTRUMENT'


// Action Types
export const loadAllInstruments = (instruments) => {
    return {
        type: LOAD_ALL_INSTRUMENTS,
        instruments
    }
}
export const loadOneInstrument = (instrument) => {
    return {
        type: LOAD_ONE_INSTRUMENT,
        instrument
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
// Get One Instrument by its ID Thunk
export const getOneInstrument = (instrumentId) => async (dispatch) => {
    const res = await fetch(`/api/instruments/${instrumentId}`)
    if (!res.ok) {
        throw new Error('Failed to fetch the instrument with id')
    }
    const instrument = await res.json()
    if (instrument.errors) {
        return instrument.errors
    }
    dispatch(loadOneInstrument(instrument))
    return instrument
}


//instrument Reducer
export const instrumentReducer = (state ={}, action) => {
    switch (action.type) {
        case LOAD_ALL_INSTRUMENTS: {
            return {...state, ...action.instruments}
        }
        case LOAD_ONE_INSTRUMENT: {
            return {...state, ...action.instrument}
        }
        default:
            return state
    }
}