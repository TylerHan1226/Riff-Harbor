import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getInstrumentBySearchThunk } from "../../redux/instrument";
import { getUserFavThunk } from "../../redux/favorite";
import { InstrumentCard, handleFav } from "../Instrument/InstrumentHelpers";
import { handleAddToCart } from "../LandingPage/LandingPage";


export default function SearchPage() {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const { searchInput } = useParams()
    const user = useSelector(state => state.session.user)
    const instruments = useSelector(state => state.instruments?.SelectedInstruments)
    const favorites = useSelector(state => state.favorites?.MyFavorites)
    const favoriteInstIds = favorites?.map(ele => ele.instrument_id)
    const orders = useSelector(state => state.orders?.CurrentOrders)


    const [toFav, setToFav] = useState(false)
    const [removeFav, setRemoveFav] = useState(false)

    useEffect(() => {
        dispatch(getInstrumentBySearchThunk(searchInput))
        dispatch(getUserFavThunk())
        setToFav(false)
        setRemoveFav(false)
    }, [nav, dispatch, searchInput])

    const isDisable = user ? false : true

    console.log("searchInput ==>", searchInput)
    console.log("instruments ==>", instruments)

    return (
        <div className="page-container">
            <h1>"{searchInput}"</h1>
                <section className="category-instrument-container">
                    {instruments?.length > 0 ? (
                        instruments.map((eachInst) => (
                            <InstrumentCard key={eachInst?.id}
                                eachInst={eachInst}
                                favoriteInstIds={favoriteInstIds}
                                user={user}
                                orders={orders}
                                isDisable={isDisable}
                                handleFav={handleFav}
                                handleAddToCart={handleAddToCart}
                                dispatch={dispatch}
                                nav={nav}
                            />
                        ))
                    ) : (
                        <h3>Sorry, we couldn't find a match for this search</h3>
                    )}
                </section>

        </div>

    );
}
