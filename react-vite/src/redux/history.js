
// Action Creators
export const LOAD_ALL_HISTORY = 'history/LOAD_ALL_HISTORY'


// Action Types
export const loadAllHistories = (histories) => ({
    type: LOAD_ALL_HISTORY,
    histories
})



// Get all histories
export const getAllHistoriesThunk = () => async (dispatch) => {
    const res = await fetch('/api/history')
    if (!res.ok) {
        throw new Error('Failed to fetch all histories')
    }
    const histories = await res.json()
    if (histories.errors) {
        return histories.errors
    }
    dispatch(loadAllHistories(histories))
    return histories
}


// History Reduce
export const historyReducer = (state={}, action) => {
    switch(action.type) {
        case LOAD_ALL_HISTORY: {
            return {...state, ...action.histories}
        }
        default:
            return state
    }
}

