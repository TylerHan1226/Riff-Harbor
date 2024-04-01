import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getOrderByUserThunk } from "../../redux/cart";
import { getInstrumentsByIdsThunk } from "../../redux/instrument";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
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

    const [hasChangedQ, setChangedQ] = useState(false);
    const reRenderOnQuantity = () => {
        setChangedQ(!hasChangedQ)
    }

    const [hasDeleted, setDeleted] = useState(false)
    const reRenderOnDelete = () => {
        setDeleted(!hasDeleted)
    }

    let subtotal = 0
    const getSubTotal = (instArr, orders) => {
        const instrumentTotal = instArr?.reduce((acc, inst) => {
            const matchingOrder = orders?.find(order => order.instrument_id == inst.id)
            if (matchingOrder) {
                return acc + (inst.price * matchingOrder.quantity)
            }
            return acc
        }, 0)
        const newTotal = parseFloat(instrumentTotal.toFixed(2))
        return newTotal
    }
    if (instArr?.length > 0) {
        subtotal = getSubTotal(instArr, orders)
    }

    useEffect(() => {
        if (!user) {
            nav('/')
        }
        dispatch(getOrderByUserThunk());
    }, [dispatch, hasChangedQ, user, hasDeleted])

    useEffect(() => {
        if (instrumentIds?.length > 0 && orders) {
            dispatch(getInstrumentsByIdsThunk(instrumentIds));
        }
    }, [dispatch, orders, hasDeleted])



    if (!orders || !instruments) {
        return <h2>Loading</h2>
    }


    return (
        <div className="cart-page-container">

            <div className="my-cart-item-container">
                {instArr?.length > 0 && instArr?.map((eachInst) => (
                    <div className="instrument-container cart-item-container" key={eachInst?.id}>
                        <div className="instrument-dtl-container">
                            <NavLink to={`/instruments/${eachInst?.id}`}>
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
                        <OrderOperation
                            orderInfo={orders.filter(ele => ele.instrument_id == eachInst.id)[0]}
                            reRenderOnQuantity={reRenderOnQuantity}
                            reRenderOnDelete={reRenderOnDelete}
                        />
                    </div>
                ))}
            </div>
            <div className='cart-checkout-container'>
                <h1>My Orders</h1>
                <h3>Subtotal: ${subtotal}</h3>
                <button className="order-action-button">
                    <OpenModalMenuItem
                        itemText="Checkout"
                        modalComponent={<ClearCart subtotal={subtotal} />}
                    />
                </button>
            </div>
        </div>

    )
}