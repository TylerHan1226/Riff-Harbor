
// Action Creators
export const LOAD_ALL_INSTRUMENTS = 'instrument/LOAD_ALL_INSTRUMENTS'
export const LOAD_ONE_INSTRUMENT = 'instrument/LOAD_ONE_INSTRUMENT'
export const CREATE_INSTRUMENT = 'instrument/CREATE_INSTRUMENT'
export const UPDATE_INSTRUMENT = 'instrument/UPDATE_INSTRUMENT'
export const DELETE_INSTRUMENT = 'instrument/DELETE_INSTRUMENT'
export const LOAD_INSTRUMENTS_BY_IDS = 'instrument/LOAD_INSTRUMENTS_BY_IDS'


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
export const deleteInstrument = (deletedInstrument) => ({
    type: DELETE_INSTRUMENT,
    deletedInstrument
})
export const loadInstrumentsByIds = (instruments) => ({
    type: LOAD_INSTRUMENTS_BY_IDS,
    instruments
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

// Get instruments by ids
export const getInstrumentsByIdsThunk = (instrumentIds) => async (dispatch) => {
    const res = await fetch(`/api/instruments`)
    if (!res.ok) {
        throw new Error('Failed to fetch instruments by ids')
    }
    const data = await res.json()
    const selectedInstruments = data.Instruments.filter(ele => instrumentIds.includes(ele.id))
    if (selectedInstruments.errors) {
        return selectedInstruments.errors
    }
    dispatch(loadInstrumentsByIds(selectedInstruments))
    return selectedInstruments
}

// Create Instrument Thunk
export const createInstrumentThunk = (newInstrumentData) => async (dispatch) => {
    const { make, model, color, category, price, details, body, fretboard, is_used, image_url } = newInstrumentData
    const formData = new FormData()
    formData.append('make', make)
    formData.append('model', model)
    formData.append('color', color)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('details', details)
    formData.append('body', body)
    formData.append('fretboard', fretboard)
    formData.append('is_used', is_used)
    if (image_url) formData.append('image_url', image_url)
    
    console.log('make in thunk ==>', make)
    console.log('image_url in thunk ==>', image_url)
    console.log('formData in thunk ==>', formData)

    const res = await fetch('/api/instruments/new', {
        method: "POST",
        // headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    if (!res.ok) {
        throw new Error('Failed to create instrument')
    }
    const newInstrument = await res.json()
    dispatch(createInstrument(newInstrument))
    return newInstrument
}

// Update Instrument Thunk
export const updateInstrumentThunk = (updatedInstrumentData, instrumentId) => async (dispatch) => {
    const { make, model, color, category, price, details, body, fretboard, is_used, image_url } = updatedInstrumentData
    const formData = new FormData()
    formData.append('make', make)
    formData.append('model', model)
    formData.append('color', color)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('details', details)
    formData.append('body', body)
    formData.append('fretboard', fretboard)
    formData.append('is_used', is_used)
    if (image_url) formData.append('image_url', image_url)

    console.log('image_url in update ==>', image_url)

    const res = await fetch(`/api/instruments/${instrumentId}/update`, {
        method: "PUT",
        // headers: {'Content-Type': 'application/json'},
        body: formData
    })
    if (!res.ok) {
        throw new Error('Failed to update instrument.')
    }
    const updatedInstrument = await res.json()
    // dispatch(updateInstrument({...instrument, ...updatedInstrument}))
    dispatch(updateInstrument({...updatedInstrument}))
    return updatedInstrument
}

// Delete Instrument Thunk
export const deleteInstrumentThunk = (instrumentId) => async (dispatch) => {
    const res = await fetch(`/api/instruments/${instrumentId}/delete`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const deletedInstrument = await res.json()
        dispatch(deleteInstrument(deletedInstrument))
    } else {
        throw new Error('Failed to delete instrument')
    }

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
        case LOAD_INSTRUMENTS_BY_IDS: {
            return {...state, ...action.instruments}
        }
        case CREATE_INSTRUMENT: {
            return {...state, ...action.newInstrument}
        }
        case UPDATE_INSTRUMENT: {
            return {...state, ...action.updatedInstrument}
        }
        case DELETE_INSTRUMENT: {
            const deleteState = {...state}
            delete deleteState[action.deletedInstrument]
            return deleteState
        }
        default:
            return state
    }
}