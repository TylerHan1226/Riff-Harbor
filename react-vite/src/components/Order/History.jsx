import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getUserHistoryThunk } from '../../redux/history';
import './History.css'


export default function History() {
    const dispatch = useDispatch()
    const histories = useSelector(state => state.histories?.UserOrderHistory)
    const instruments = useSelector(state => state.histories?.HistoryInst)

    console.log('histories ==>', histories)
    console.log('instruments ==>', instruments)


    useEffect(() => {
        dispatch(getUserHistoryThunk())
    }, [dispatch])


    return (
        <div className='history-container'>
            <h1>My Order History</h1>
            <div className='my-instrument-item-container'>
                {instruments?.length > 0 ? instruments?.map((eachInst) => (
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
                        {/* <div className="my-inst-item-btn-container">
                            <button className="my-inst-action-btn">
                                <NavLink className='add-to-cart-text my-inst-update-btn' to={`${eachInst?.id}/update`}>
                                    Update
                                </NavLink>
                            </button>
                            <button className="delete-button my-inst-action-btn">
                                <OpenModalMenuItem
                                    itemText='Delete Instrument'
                                    modalComponent={<DeleteInstrument instrumentId={eachInst?.id} reRenderOnDelete={reRenderOnDelete} />}
                                />
                            </button>
                        </div> */}

                    </div>
                )) : (
                    <h3>You don&apos;t have a history yet</h3>
                )}
            </div>
        </div>
    )
}