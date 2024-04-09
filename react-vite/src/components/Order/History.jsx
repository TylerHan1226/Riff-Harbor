import { useEffect } from 'react';
// import { NavLink, useNavigate } from "react-router-dom";
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
        const createdAt = obj.created_at?.slice(0, 16)
        if (!acc[createdAt]) {
            acc[createdAt] = []
        }
        acc[createdAt].push(obj)
        return acc
    }, {})
    let sortedHistory = []
    if (sortedHistoryObj) {
        sortedHistory = Object.values(sortedHistoryObj)
    }


    const getSubtotal = (history) => {
        const subtotal = history.reduce((acc, curr) => {
            const price = curr.instrument?.price * curr.quantity
            return acc + price
        }, 0)
        return subtotal
    }


    useEffect(() => {
        dispatch(getUserHistoryThunk())
    }, [dispatch])


    return (
        <div className='history-container'>
            <h1>My Order History</h1>
            <div className='my-instrument-item-container'>
                {sortedHistory?.reverse().map((historyArr) => (
                    <div className='history-block' key={historyArr[0].created_at}>
                        <div className='history-header'>
                        <div>
                            <h4>{historyArr[0].created_at.slice(0,16).split(' ')[0]}</h4>
                            <h4>{historyArr[0].created_at.slice(0,16).split(' ')[1]}</h4>
                        </div>
                        <h3 className='history-subtotal'>Subtotal: {getSubtotal(historyArr)}</h3>
                        </div>
                        <div className='history-instruments'>
                            {historyArr.map((history) => (
                                <div className='history-inst-item' key={history.id}>
                                    <img className='history-inst-img' src={history.instrument.image_url} />
                                    <div>
                                        <h3>{history.instrument.model}</h3>
                                        <p>{history.instrument.color}</p>
                                        <p>{history.instrument.category}</p>
                                        <p>${history.instrument.price}</p>
                                        <p>quantity: {history.quantity}</p>
                                        <p>total: ${history.quantity * history.instrument.price}</p>
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