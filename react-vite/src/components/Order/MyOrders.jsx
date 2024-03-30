import React, { useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getOrderByUserThunk } from "../../redux/cart";
import { getInstrumentsByIdsThunk } from "../../redux/instrument";
import OrderOperation from './OrderOperation'
import './Orders.css'


export default function MyOrders() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const user = useSelector(state => state.session.user)
    const orders = useSelector(state => state.orders?.CurrentOrders)
    const instruments = useSelector(state => state.instruments)
    const instArr = Object.values(instruments)?.slice(0, orders?.length)

    console.log('instArr ==>', instArr)

    let subTotal = 0
    if (instArr?.length > 0) {
        subTotal = instArr.reduce((acc, cur) => {
            return acc + cur.price
        }, 0)
    }
    console.log('subTotal ==>', subTotal)

    useEffect(() => {
        if (!user) {
            nav('/')
        }
        dispatch(getOrderByUserThunk());
    }, [dispatch])

    const instrumentIds = orders?.map(ele => ele.instrument_id)

    useEffect(() => {
        if (instrumentIds?.length > 0 && orders) {
            dispatch(getInstrumentsByIdsThunk(instrumentIds));
        }
    }, [dispatch, orders])

    if (!orders || !instruments) {
        return <h2>Loading</h2>
    }


    return (
        <div className="page-container">
            <h1>My Orders</h1>
            <h3>Subtotal: ${subTotal}</h3>
            <div className="my-instrument-item-container">
                {instArr?.length > 0 && instArr?.map((eachInst) => (
                    <div className="instrument-container" key={eachInst?.id}>
                        <div className="instrument-dtl-container">
                            <NavLink to={`${eachInst?.id}`}>
                                <img className="instrument-image" src={eachInst?.image_url} />
                            </NavLink>
                        </div>
                        <div className="instrument-dtl-container">
                            <h4>{eachInst?.model}</h4>
                            <p className="inst-dtl-text">{eachInst?.category}</p>
                            <p className="inst-dtl-text">${eachInst?.price}</p>
                            {eachInst?.is_used ? (
                                <p className="inst-dtl-text">Pre-owned</p>
                            ) : (
                                <p className="inst-dtl-text">New</p>
                            )}
                        </div>
                        <OrderOperation instrument={eachInst} orderInfo={orders.filter(ele => ele.instrument_id == eachInst.id)[0]}/>
                        {/* <div className="my-cart-item-btn-container">
                            <div className='quantity-container'>
                                <button>-</button>
                                <p>
                                    Quantity: {orders?.filter(ele => ele.instrument_id == eachInst.id)[0]?.quantity}
                                </p>
                                <button>+</button>
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>

        </div>

    )
}