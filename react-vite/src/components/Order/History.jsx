import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getUserHistoryThunk } from '../../redux/history';



export default function History() { 
    const dispatch = useDispatch()
    const history = useSelector(state => state.histories?.UserOrderHistory)

    console.log('history ==>', history)

    useEffect(() => {
        dispatch(getUserHistoryThunk())
    }, [dispatch])


    return (
        <>Hi</>
    )
}