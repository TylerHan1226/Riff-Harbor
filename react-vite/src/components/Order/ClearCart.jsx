import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import { clearCartThunk, getOrderByIdThunk } from "../../redux/cart";
// import { deleteInstrumentThunk, getOneInstrumentThunk } from "../../redux/instrument";

export default function ClearCart({subtotal}) {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session)

    useEffect(() => {
        if (!user) {
            nav('/')
        }
    }, [dispatch, user])

    const handleDeleteOrder = async (e) => {
        e.preventDefault()
        dispatch(clearCartThunk())
        closeModal()
        alert('Congratulations! You are ready for your music journey!')
        nav(`/`)
    }

    return (
        <div className='delete-instrument-modal'>
            <div className='delete-form-container'>
                <h1 className='confirm-text'>Confirm Your Subtotal</h1>
                <h2>${subtotal}</h2>
                <button className='modal-btn confirm-btn' onClick={handleDeleteOrder}>Checkout</button>
                <button className='modal-btn' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}