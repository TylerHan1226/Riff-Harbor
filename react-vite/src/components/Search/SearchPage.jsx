import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getInstrumentBySearchThunk } from "../../redux/instrument";
import { getUserFavThunk } from "../../redux/favorite";
import { InstrumentCard, handleFav } from "../Instrument/InstrumentHelpers";
import { FilterCard } from "./FilterCard";
import { handleAddToCart } from "../LandingPage/LandingPage";


export default function SearchPage() {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const { searchInput } = useParams()
    const user = useSelector(state => state.session.user)
    let instruments = useSelector(state => state.instruments?.SelectedInstruments)
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

    // Filters
    // brand filter
    const [brand, setBrand] = useState('')
    const handleBrandChange = (e) => {
        setBrand(e)
    }
    if (brand !== '') instruments = instruments.filter(ele => ele.make == brand)

    // condition filter
    const [isUsed, setIsUsed] = useState(null)
    const handleCondition = (e) => {
        if ((isUsed == true && e == true) || (isUsed == false && e == false)) {
            setIsUsed(null)
        } else {
            setIsUsed(e)
        }
    }
    if (isUsed == true) instruments = instruments.filter(ele => ele.is_used == true)
    if (isUsed == false) instruments = instruments.filter(ele => ele.is_used == false)
    // price filter
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const handleMinPriceChange = (e) => {
        const newValue = parseFloat(e.target.value)
        newValue ? setMinPrice(newValue) : setMinPrice('')
    }
    const handleMaxPriceChange = (e) => {
        const newValue = parseFloat(e.target.value)
        newValue ? setMaxPrice(newValue) : setMaxPrice('')
    }
    if (minPrice) instruments = instruments.filter(ele => ele.price > minPrice)
    if (maxPrice) instruments = instruments.filter(ele => ele.price < maxPrice)


    console.log("searchInput ==>", searchInput)
    console.log("instruments ==>", instruments)

    return (
        <div className="page-container">
            <h1>{searchInput}</h1>
            <div className="category-container">
                <FilterCard
                    isUsed={isUsed}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    handleBrandChange={handleBrandChange}
                    handleMinPriceChange={handleMinPriceChange}
                    handleMaxPriceChange={handleMaxPriceChange}
                    handleCondition={handleCondition}
                />
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
        </div>

    );
}
