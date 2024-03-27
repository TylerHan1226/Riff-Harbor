
import { useEffect } from 'react'
import './Instrument.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getOneInstrumentThunk } from '../../redux/instrument'
import { getAllUsersThunk } from '../../redux/session'


export default function InstrumentDetails() {

    const dispatch = useDispatch()

    const instrument = useSelector(state => state.instruments)
    const session = useSelector(state => state.session)
    const { instrumentId } = useParams()
    console.log('instrumentId ==>', instrumentId)
    console.log('instrument ==>', instrument)

    useEffect(() => {
        dispatch(getOneInstrumentThunk(instrumentId))
        dispatch(getAllUsersThunk())
    }, [dispatch, instrumentId])

    if (!instrument || !instrumentId || !session) {
        return <h2>loading...</h2>
    }

    const allUsers = session.users
    const seller = allUsers?.filter(ele => ele.id == instrument.seller_id)[0]
    console.log('seller ==>', seller)
    console.log('seller?.username ==>', seller?.username)

    return (
        <div id='instrument-dtl-page-root'>
            <button className='back-button'><NavLink className='back-button-text' to='/'>back</NavLink></button>
            <div id='instrument-dtl-page-container'>
                {/* <div id='instrument-dtl-page-container'> */}
                {/* <div id='instrument-dtl-page-container'> */}
                <div className="instrument-dtl-info-container">
                    <img id="instrument-dtl-image" src={instrument.image_url} />
                </div>
                <div className="instrument-dtl-info-container">
                    <h2>{instrument.model}</h2>
                    <h3>{instrument.color}</h3>
                    <p className="inst-dtl-text">${instrument.price}</p>
                    {instrument.is_used ? (
                        <p className="inst-dtl-text">Condition: Pre-owned</p>
                    ) : (
                        <p className="inst-dtl-text">Condition: New</p>
                    )}
                    <p className="inst-dtl-text">Make: {instrument.make}</p>
                    <p className="inst-dtl-text">Body Material: {instrument.body}</p>
                    <p className="inst-dtl-text">Fretboard Material: {instrument.fretboard}</p>
                    <p className="inst-dtl-text">Seller: {seller?.username}</p>
                    {/* <p className="inst-dtl-text">Contact: {seller?.email}</p> */}
                    <button className="add-to-cart-button-dtl">
                        <NavLink className='add-to-cart-text-dtl'>
                            Add to Cart
                        </NavLink>
                    </button>
                </div>

                {/* </div> */}
            </div>
        </div>

    )
}