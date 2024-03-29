
// Action Creators
export const LOAD_ALL_ORDER_ITEMS = 'cart/LOAD_ALL_ORDER_ITEMS'


// Action Types
export const loadAllOrders = (orders) => {
    type: LOAD_ALL_ORDER_ITEMS,
    orders
}



// Get All Orders
// export const getAllOrdersThunk = () => async (dispatch) => {
//     const res = await fetch
// }