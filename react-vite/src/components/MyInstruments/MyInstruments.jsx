import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getAllInstrumentsThunk } from "../../redux/instrument"
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteInstrument from '../Instrument/DeleteInstrument'
import './MyInstruments.css'


export default function MyInstruments() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const instruments = useSelector(state => state.instruments.Instruments)

    const [deletedInstrument, setDeleteInst] = useState(false)

    console.log('user ==>', user)
    console.log('instruments ==>', instruments)

    const reRenderOnDelete = () => {
        setDeleteInst(!deletedInstrument)
    }

    useEffect(() => {
        dispatch(getAllInstrumentsThunk())
    }, [dispatch, deletedInstrument])

    if (!user || !instruments) {
        <h2>Loading...</h2>
    }

    const myInstruments = instruments?.filter(ele => ele.seller_id == user?.id)
    console.log('myInstruments ==>', myInstruments)

    return (

        <div id="my-instruments-page-container">
            <h1>My Instruments</h1>
            <div className="my-instrument-item-container">
                {myInstruments?.length > 0 && myInstruments?.map((eachInst) => (
                    <div className="instrument-container" key={eachInst?.id}>
                        <div className="instrument-dtl-container">
                            <NavLink to={`instruments/${eachInst?.id}`}>
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
                            <button className="add-to-cart-button">
                                <NavLink className='add-to-cart-text' to={`instruments/${eachInst?.id}/update`}>
                                    Update
                                </NavLink>
                            </button>
                            <button className="add-to-cart-button-dtl delete-button">
                                <OpenModalMenuItem
                                    itemText='Delete Instrument'
                                    modalComponent={<DeleteInstrument instrumentId={eachInst?.id} reRenderOnDelete={reRenderOnDelete} />}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )

}

