import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getInstrumentsByModelThunk } from "../../redux/instrument";
import { getUserFavThunk, removeFavThunk, addToFavoriteThunk } from '../../redux/favorite'
import { handleAddToCart } from "../LandingPage/LandingPage";
import { GoHeartFill } from "react-icons/go";
import { InstrumentCard } from "../Category/Category";


export default function SearchResult() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { instModel } = useParams()
    const user = useSelector(state => state.session.user)
    let instruments = useSelector(state => state.instruments?.SelectedInstruments)
    const favorites = useSelector(state => state.favorites?.MyFavorites)
    const favoriteInstIds = favorites?.map(ele => ele.instrument_id)
    const orders = useSelector(state => state.orders?.CurrentOrders)

    const [toFav, setToFav] = useState(false)
    const [removeFav, setRemoveFav] = useState(false)

    useEffect(() => {
        dispatch(getInstrumentsByModelThunk(instModel))
        dispatch(getUserFavThunk())
        setToFav(false)
        setRemoveFav(false)
    }, [dispatch, instModel, toFav, removeFav])

    const isDisable = user ? false : true

    const handleFav = (instrumentId, instrument) => {
        if (favoriteInstIds.includes(instrumentId)) {
            const favToRemove = favorites.filter(fav => fav.instrument_id == instrumentId)[0]
            dispatch(removeFavThunk(favToRemove.id))
            alert(`Removed ${instrument.model} from favorites`)
            setToFav(true)
        } else {
            const newFav = { "instrument_id": instrumentId }
            dispatch(addToFavoriteThunk(newFav))
            alert(`Successfully added ${instrument.model} to favorites!`)
            setRemoveFav(true)
        }
    }

    return (
        <div className="page-container">
            <h1>"{instModel}"</h1>
            <section className="category-instrument-container">
          {filteredInst?.length > 0 ? (
            filteredInst.map((eachInst) => (
              <InstrumentCard key={eachInst?.id}
              eachInst={eachInst}
              favoriteInstIds={favoriteInstIds}
              user={user}
              isDisable={isDisable}
              />
            ))
          ) : instruments?.length > 0 ? (
            instruments.map((eachInst) => (
              <InstrumentCard key={eachInst?.id}
              eachInst={eachInst}
              favoriteInstIds={favoriteInstIds}
              user={user}
              isDisable={isDisable}
              />
            ))
          ) : (
            <h3>Sorry, we couldn't find a match for this search</h3>
          )}
        </section>
        </div>
    );
}
