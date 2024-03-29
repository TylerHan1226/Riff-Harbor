
// Action Creators
export const LOAD_ALL_ORDER_ITEMS = 'cart/LOAD_ALL_ORDER_ITEMS'
export const LOAD_ORDER_BY_USER = 'cart/LOAD_ORDER_BY_USER'
export const CREATE_ORDER = 'cart/CREATE_ORDER'


// Action Types
export const loadAllOrders = (orders) => ({
    type: LOAD_ALL_ORDER_ITEMS,
    orders
})
export const loadOrdersByUser = (orders) => ({
    type: LOAD_ORDER_BY_USER,
    orders
})
export const createOrder = (newOrder) => ({
    type: CREATE_ORDER,
    newOrder
})


// Get All Orders
export const getAllOrdersThunk = () => async (dispatch) => {
    const res = await fetch('/api/orders')
    if (!res.ok) {
        throw new Error('Failed to fetch all orders')
    }
    const orders = await res.json()
    if (orders.errors){
        return orders.errors
    }
    dispatch(loadAllOrders(orders))
    return orders
}

// Get Orders by current user
export const getOrderByUserThunk = () => async (dispatch) => {
    const res = await fetch('/api/orders/current')
    if (!res.ok) {
        throw new Error('Failed to fetch the orders by current user')
    }
    const orders = await res.json()
    if (orders.errors){
        return orders.errors
    }
    dispatch(loadOrdersByUser(orders))
    return orders
}

// Create an Order
export const createOrderThunk = (newOrderData) => async (dispatch) => {
    const res = await fetch('/api/orders/new', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newOrderData)
    })
    if (!res.ok) {
        throw new Error('Failed to place order')
    }
    const newOrder = await res.json()
    dispatch(createOrder(newOrder))
    return newOrder
}

// Update an Order

// Delete Order by id

// Clear Cart / Checkout


export const orderReducer = (state={}, action) => {
    switch (action.type) {
        case LOAD_ALL_ORDER_ITEMS: {
            return {...state, ...action.orders}
        }
        case LOAD_ORDER_BY_USER: {
            return {...state, ...action.orders}
        }
        case CREATE_ORDER: {
            return {...state, ...action.newOrder}
        }
        default:
            return state
    }
}

