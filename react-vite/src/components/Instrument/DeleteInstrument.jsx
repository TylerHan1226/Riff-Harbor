import { useDispatch, useSelector } from "react-redux";
import { deleteInstrumentThunk, getOneInstrumentThunk } from "../../redux/instrument";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";


export default function DeleteInstrument({instrumentId, reRenderOnDelete}) {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { closeModal } = useModal()
    
    const instrument = useSelector(state => state.instruments)
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        if (!user) {
            nav('/')
        }
        dispatch(getOneInstrumentThunk(instrumentId))
    }, [dispatch, instrumentId])

    const deleteInstrument = async (e) => {
        e.preventDefault()
        dispatch(deleteInstrumentThunk())
    }

    return (
        <h1>Delete Page!</h1>
    )


}