
// Action Creators
export const LOAD_ALL_INSTRUMENTS = 'instrument/LOAD_ALL_INSTRUMENTS'
export const LOAD_ONE_INSTRUMENT = 'instrument/LOAD_ONE_INSTRUMENT'
export const CREATE_INSTRUMENT = 'instrument/CREATE_INSTRUMENT'
export const UPDATE_INSTRUMENT = 'instrument/UPDATE_INSTRUMENT'


// Action Types
export const loadAllInstruments = (instruments) => ({
    type: LOAD_ALL_INSTRUMENTS,
    instruments
})
export const loadOneInstrument = (instrument) => ({
    type: LOAD_ONE_INSTRUMENT,
    instrument
})
export const createInstrument = (newInstrument) => ({
    type: CREATE_INSTRUMENT,
    newInstrument
})
export const updateInstrument = (updatedInstrument) => ({
    type: UPDATE_INSTRUMENT,
    updatedInstrument
})


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
export const getOneInstrumentThunk = (instrumentId) => async (dispatch) => {
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
// Create Instrument Thunk
export const createInstrumentThunk = (newInstrumentData) => async (dispatch) => {
    const res = await fetch('/api/instruments/new', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newInstrumentData)
    })
    if (!res.ok) {
        throw new Error('Failed to create instrument')
    }
    const newInstrument = await res.json()
    dispatch(createInstrument(newInstrument))
    return newInstrument
}
// Update Instrument Thunk
export const updateInstrumentThunk = (instrument, instrumentId) => async (dispatch) => {
    const res = await fetch(`api/instruments/${instrumentId}/update`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(instrument)
    })
    if (!response.ok) {
        throw new Error('Failed to update instrument.')
    }
    const updatedInstrument = await res.json()
    // dispatch(updateInstrument({...instrument, ...updatedInstrument}))
    dispatch(updateInstrument({...updatedInstrument}))
    return updatedInstrument
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
        case CREATE_INSTRUMENT: {
            return {...state, ...action.newInstrument}
        }
        case UPDATE_INSTRUMENT: {
            return {...state, ...action.updatedInstrument}
        }
        default:
            return state
    }
}