import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import { deleteOrderThunk, getOrderByIdThunk } from "../../redux/cart";
// import { deleteInstrumentThunk, getOneInstrumentThunk } from "../../redux/instrument";

export default function DeleteOrder ({orderId, reRenderOnDelete}) {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { closeModal } = useModal()

    useEffect(() => {
        if (!user) {
            nav('/')
        }
        dispatch(getOrderByIdThunk(orderId))
    }, [dispatch, orderId])

    const handleDeleteOrder = async (e) => {
        e.preventDefault()
        dispatch(deleteOrderThunk(orderId))
        closeModal()
        reRenderOnDelete()
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