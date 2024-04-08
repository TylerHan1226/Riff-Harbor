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

    const historyCollection = histories?.map(history => 
        history = {...history, "instrument": instruments?.filter(ele => ele.id == history.instrument_id)[0]}
    )
    console.log('historyCollection ==>', historyCollection)

    const sortedHistoryObj = historyCollection?.reduce((acc, obj) => {
        const createdAt = obj.created_at?.slice(0, 16);
        if (!acc[createdAt]) {
            acc[createdAt] = [];
        }
        acc[createdAt].push(obj);
        return acc;
    }, {});
    let sortedHistory = []
    if (sortedHistoryObj) {
        sortedHistory = Object.values(sortedHistoryObj);
    }

    console.log('sortedHistory ==>', sortedHistory);


    useEffect(() => {
        dispatch(getUserHistoryThunk())
    }, [dispatch])


    return (
        <div className='history-container'>
            <h1>My Order History</h1>
            <div className='my-instrument-item-container'>
                {sortedHistory.map((historyBlock) => (
                    <div className='history-block' key={historyBlock[0].created_at}>
                        <h3>{historyBlock[0].created_at.slice(0,16)}</h3>
                        <div className='history-instruments'>
                            {historyBlock.map((history) => (
                                <div className='history-inst-item' key={history.id}>
                                    <h3>{history.instrument_id}</h3>
                                    <div>
                                        hello
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}