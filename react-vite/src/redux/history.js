
// Action Creators
export const LOAD_ALL_HISTORY = 'history/LOAD_ALL_HISTORY'
export const LOAD_HISTORY_BY_USER = 'history/LOAD_HISTORY_BY_USER'


// Action Types
export const loadAllHistories = (histories) => ({
    type: LOAD_ALL_HISTORY,
    histories
})
export const loadHistoryByUser = (histories) => ({
    type: LOAD_HISTORY_BY_USER,
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
// Get History by User
export const getUserHistoryThunk = () => async (dispatch) => {
    const res = await fetch('/api/history/current')
    if (!res.ok) {
        throw new Error('Failed to fetch history by user')
    }
    const histories = await res.json()
    if (histories.errors) {
        return histories.errors
    }
    dispatch(loadHistoryByUser(histories))
    return histories
}


// History Reduce
export const historyReducer = (state={}, action) => {
    switch(action.type) {
        case LOAD_ALL_HISTORY: {
            return {...state, ...action.histories}
        }
        case LOAD_HISTORY_BY_USER: {
            return {...state, ...action.histories}
        }
        default:
            return state
    }
}

