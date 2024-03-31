import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import { deleteOrderThunk, getOrderByIdThunk } from "../../redux/cart";
// import { deleteInstrumentThunk, getOneInstrumentThunk } from "../../redux/instrument";

export default function DeleteOrder({ orderId}) {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session)

    useEffect(() => {
        if (!user) {
            nav('/')
        }
        dispatch(getOrderByIdThunk(orderId))
    }, [dispatch])


    const handleDeleteOrder = async (e) => {
        e.preventDefault()
        dispatch(deleteOrderThunk(orderId))
        closeModal()
        nav(`/orders/MyOrders`)
    }

    return (
        <div className='delete-instrument-modal'>
            <div className='delete-form-container'>
                <h1 className='remove-inst-title'>Are you sure you want to remove this order from your cart?</h1>
                <button className='delete-modal-btn confirm-delete-btn' onClick={handleDeleteOrder}>Remove Order Item</button>
                <button className='delete-modal-btn' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}