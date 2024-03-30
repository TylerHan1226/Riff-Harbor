import React, { useEffect, useMemo } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getOrderByUserThunk } from "../../redux/cart";
import './Orders.css'
import { getInstrumentsByIdsThunk } from "../../redux/instrument";


export default function MyOrders() {
    // const dispatch = useDispatch()
    // const user = useSelector(state => state.session.user)
    // const orders = useSelector(state => state.orders)
    // const instruments = useSelector(state => state.instruments)


    // useEffect(() => {
    //     dispatch(getOrderByUserThunk())
    // }, [dispatch])

    // if (!user || !orders || !instruments) {
    //     return <h2>Loading</h2>
    // }

    // const myOrders = orders?.CurrentOrders
    // const instrumentIds = myOrders?.map(ele => ele.instrument_id)
    // const selectedInstruments = instruments.Instrument?.filter(ele => instrumentIds.includes(ele.id))

    // console.log('myOrders ==>', myOrders)
    // console.log('instrumentIds ==>', instrumentIds)
    // console.log('selectedInstruments ==>', selectedInstruments)

    // // useEffect(() => {
    // //     if (instrumentIds && instrumentIds.length > 0) {
    // //         dispatch(getInstrumentsByIdsThunk(instrumentIds));
    // //     }
    // // }, [dispatch]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const orders = useSelector(state => state.orders);
    const instruments = useSelector(state => state.instruments);

    useEffect(() => {
        dispatch(getOrderByUserThunk());
    }, [dispatch]);

    // Memoize instrumentIds to prevent unnecessary re-renders
    const instrumentIds = useMemo(() => {
        return orders?.CurrentOrders?.map(ele => ele.instrument_id) || [];
    }, [orders]);

    useEffect(() => {
        if (instrumentIds.length > 0) {
            dispatch(getInstrumentsByIdsThunk(instrumentIds));
        }
    }, [dispatch, instrumentIds]);

    if (!user || !orders || !instruments) {
        return <h2>Loading</h2>;
    }

    const myOrders = orders.CurrentOrders;
    const selectedInstruments = instruments.Instrument?.filter(ele => instrumentIds.includes(ele.id));

    console.log('myOrders ==>', myOrders);
    console.log('instrumentIds ==>', instrumentIds);
    console.log('selectedInstruments ==>', selectedInstruments);


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