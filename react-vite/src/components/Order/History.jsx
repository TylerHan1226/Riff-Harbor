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

    const sortedHistoryObj = histories?.reduce((acc, obj) => {
        const createdAt = obj.created_at?.slice(0, 16);
        if (!acc[createdAt]) {
            acc[createdAt] = [];
        }
        acc[createdAt].push(obj);
        return acc;
    }, {});
    let sortedHistory = []
    if (sortedHistoryObj) {
        const sortedHistoryArr = Object.values(sortedHistoryObj);
        console.log('sortedHistoryArr ==>', sortedHistoryArr)
        sortedHistory = sortedHistoryArr.map(historyBlock => {
            return historyBlock.map(history => {
                console.log('history ==>', history)
                return history.instrument = 'instrument!'
                // history.instrument = instruments?.filter(instrument => instrument.id == history.instrument_id)
            })
        })
    }

    console.log('sortedHistory ==>', sortedHistory);
    // sortedHistory.map((historyBlock) => {
    //     console.log('historyBlock ==>', historyBlock)
    //     console.log('historyBlock ==>', historyBlock[0].created_at)
    // })

    useEffect(() => {
        dispatch(getUserHistoryThunk())
    }, [dispatch])


    return (
        <div className='history-container'>
            <h1>My Order History</h1>
            <div className='my-instrument-item-container'>
                {/* {sortedHistory.map((historyBlock) => (
                    <div className='history-block' key={historyBlock[0].created_at}>
                        <h3>{historyBlock[0].created_at}</h3>
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
                ))} */}
            </div>
        </div>
    )
}