import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateOrderThunk } from "../../redux/cart"
import DeleteOrder from "./DeleteOrder"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"


export default function OrderOperation({ instrument, orderInfo }) {
    const dispatch = useDispatch()

    const [orderQuantity, setOrderQuantity] = useState(orderInfo?.quantity)

    const handleInc = () => {
        setOrderQuantity(ele => ele + 1)
        const updatedOrder = { quantity: orderQuantity + 1 }
        dispatch(updateOrderThunk(orderInfo.id, updatedOrder))
    }
    const handleDec = () => {
        if (orderQuantity == 1) {
            return (
                <DeleteOrder orderId={orderInfo.id} />
            )
        } else {
            setOrderQuantity(ele => ele - 1)
            const updatedOrder = { quantity: orderQuantity - 1 }
            dispatch(updateOrderThunk(orderInfo.id, updatedOrder))
        }
    }


    return (
        <div className="my-cart-item-btn-container">
            <div className='quantity-container'>
                {orderQuantity == 1 ? (
                    <button className="quantity-btn" onClick={handleDec}>
                        <OpenModalMenuItem
                            itemText='-'
                            modalComponent={<DeleteOrder orderId={orderInfo?.id} />}
                        />
                    </button>
                ) : (
                    <button className="quantity-btn" onClick={handleDec}>-</button>
                )}
                <p className="cart-btn-text">
                    Quantity: {orderQuantity}
                </p>
                <button className="quantity-btn" onClick={handleInc}>+</button>
            </div>
            <div className="remove-order-container">
                <button className="order-remove-button">
                    <OpenModalMenuItem
                        itemText='Remove from cart'
                        modalComponent={<DeleteOrder orderId={orderInfo?.id} />}
                    />
                </button>
            </div>
        </div>
    )
}