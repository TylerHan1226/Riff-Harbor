import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteOrderThunk, updateOrderThunk } from "../../redux/cart"
import { useNavigate } from "react-router-dom"
import DeleteOrder from "./DeleteOrder"


export default function OrderOperation ({instrument, orderInfo}) {

    const nav = useNavigate()
    const dispatch = useDispatch()

    const [orderQuantity, setOrderQuantity] = useState(orderInfo?.quantity)
    const [deletedOrder, setDeleteOrder] = useState(false)
    
    const reRenderOnDelete = () => {
        setDeleteOrder(!deletedOrder)
    } 


    const handleInc = () => {
        setOrderQuantity(ele => ele + 1)
        const updatedOrder = {quantity: orderQuantity + 1}
        dispatch(updateOrderThunk(orderInfo.id, updatedOrder))
    }
    const handleDec = () => {
        if (orderQuantity == 1) {
            return <DeleteOrder />
        }
        setOrderQuantity(ele => ele - 1)
        const updatedOrder = {quantity: orderQuantity - 1}
        dispatch(updateOrderThunk(orderInfo.id, updatedOrder))
    }
    const handleRemoveItem = () => {
        dispatch(deleteOrderThunk(orderInfo.id))
        alert('Successfully removed item from cart')
    }

    // useEffect(() => {
    //     console.log('Hello!')
    // }, [orderInfo, orderQuantity])

    return (
        <div className="my-cart-item-btn-container">
        <div className='quantity-container'>
            <button className="quantity-btn" onClick={handleDec}>-</button>
            <p>
                Quantity: {orderQuantity}
            </p>
            <button className="quantity-btn" onClick={handleInc}>+</button>
        </div>
        <div className="remove-order-container">
            <button onClick={handleRemoveItem}>Remove from cart</button>
        </div>
    </div>
    )
}