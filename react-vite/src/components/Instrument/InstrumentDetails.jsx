
import { useEffect } from 'react'
import './Instrument.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOneInstrument } from '../../redux/instrument'
import { NavLink, useParams } from 'react-router-dom'

export default function InstrumentDetails() {

    const dispatch = useDispatch()

    const instrument = useSelector(state => state.instruments)
    const {instrumentId} = useParams()
    console.log('instrumentId ==>', instrumentId)
    console.log('instrument ==>', instrument)

    useEffect(() => {
        dispatch(getOneInstrument(instrumentId))
    }, [dispatch, instrumentId])

    if (!instrument) {
        return <h2>loading...</h2>
    }

    return (
        <div id="create-inst-form-container">
            {/* <div id='instrument-dtl-page-container'> */}
            <div id='instrument-dtl-page-container'>

                    <div className="instrument-dtl-info-container">
                            <img id="instrument-dtl-image" src={instrument.image_url} />
                    </div>

                    <div class="instrument-dtl-info-container">
                        <p className="inst-dtl-text">{instrument.model}</p>
                        <p className="inst-dtl-text">{instrument.color}</p>
                        <p className="inst-dtl-text">${instrument.price}</p>
                        <p className="inst-dtl-text">Make: {instrument.make}</p>
                        <p className="inst-dtl-text">Body Material: {instrument.body}</p>
                        <p className="inst-dtl-text">Fretboard Material: {instrument.fretboard}</p>
                        <p className="inst-dtl-text">Seller: </p>
                        <button className="add-to-cart-button">Add to Cart</button>
                    </div>

            </div>
        </div>
    )
}