import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getOrderByUserThunk } from "../../redux/cart";
import './Orders.css'


export default function MyOrders() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const orders = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(getOrderByUserThunk())
    }, [dispatch])

    if (!user || !orders) {
        return <h2>Loading</h2>
    }

    const myOrders = orders.CurrentOrders
    console.log('myOrders ==>', myOrders)


    return (
        <div className="page-container">
            <h1>My Orders</h1>
            <div className="my-instrument-item-container">
                {myOrders?.length > 0 && myOrders?.map((eachInst) => (
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
                        <div className="my-inst-item-btn-container">
                        <button className="my-inst-action-btn">
                                <NavLink className='add-to-cart-text my-inst-update-btn' to={`${eachInst?.id}/update`}>
                                    Update
                                </NavLink>
                            </button>
                            {/* <button className="delete-button my-inst-action-btn">
                                <OpenModalMenuItem
                                    itemText='Delete Instrument'
                                    modalComponent={<DeleteInstrument instrumentId={eachInst?.id} reRenderOnDelete={reRenderOnDelete} />}
                                />
                            </button> */}
                        </div>

                    </div>
                ))}
            </div>

        </div>

    )
}