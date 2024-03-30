import { useState } from "react"


export default function OrderOperation ({instrument, orderInfo}) {

    // console.log('instrument ==>', instrument)
    // console.log('orderInfo ==>', orderInfo)
    
    const [orderQuantity, setOrderQuantity] = useState(orderInfo.quantity)

    const handleInc = () => {
        setOrderQuantity(ele => ele + 1)
    }

    const handleDec = () => {
        setOrderQuantity(ele => ele - 1)
    }

    return (
        <div className="my-cart-item-btn-container">
        <div className='quantity-container'>
            <button className="quantity-btn" onClick={handleDec}>-</button>
            <p>
                Quantity: {orderQuantity}
            </p>
            <button className="quantity-btn" onClick={handleInc}>+</button>
        </div>
    </div>
    )
}