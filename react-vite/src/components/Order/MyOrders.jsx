import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { getOrderByUserThunk } from "../../redux/cart";
import { getInstrumentsByIdsThunk } from "../../redux/instrument";
import OrderOperation from './OrderOperation'
import ClearCart from './ClearCart';
import './Orders.css'




export default function MyOrders() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const user = useSelector(state => state.session.user)
    const orders = useSelector(state => state.orders?.CurrentOrders)
    const instruments = useSelector(state => state.instruments)
    const instArr = Object.values(instruments)?.slice(0, orders?.length)
    const instrumentIds = orders?.map(ele => ele.instrument_id)
    console.log('instArr ==>', instArr)
    console.log('orders ==>', orders)

    const [subtotal, setSubtotal] = useState(0)

    // get subtotal
    // let subtotal = 0

    useEffect(() => {
        if (!user) {
            nav('/')
        }
        dispatch(getOrderByUserThunk());
    }, [dispatch, user])

    const instrumentTotal = []
    useEffect(() => {
        instArr?.forEach(inst => {
            orders?.forEach(order => {
                if (inst.id == order.instrument_id) {
                    instrumentTotal.push(inst.price * order.quantity)
                }
            })
        })
        const newTotal = instrumentTotal.reduce((acc, curr) => {
            return acc + curr
        }, 0)
        const roundedTotal = parseFloat(newTotal.toFixed(2))
        setSubtotal(roundedTotal)
    }, [orders, instArr, instrumentTotal])

    useEffect(() => {
        if (instrumentIds?.length > 0 && orders) {
            dispatch(getInstrumentsByIdsThunk(instrumentIds));
        }
    }, [dispatch, orders])


    if (!orders || !instruments) {
        return <h2>Loading</h2>
    }


    return (
        <div className="cart-page-container">

            <div className="my-cart-item-container">
                {instArr?.length > 0 && instArr?.map((eachInst) => (
                    <div className="instrument-container cart-item-container" key={eachInst?.id}>
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
                        <OrderOperation instrument={eachInst} orderInfo={orders.filter(ele => ele.instrument_id == eachInst.id)[0]} />
                    </div>
                ))}
            </div>

            <div className='cart-checkout-container'>
                <h1>My Orders</h1>
                <h3>Subtotal: ${subtotal}</h3>
                <button className="order-action-button">
                    <OpenModalMenuItem
                        itemText="Check Out"
                        modalComponent={<ClearCart subtotal={subtotal} />}
                    />
                    
                </button>
            </div>

        </div>

    )
}