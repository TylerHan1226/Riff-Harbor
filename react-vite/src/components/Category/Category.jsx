
// import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getInstrumentsByCategoryThunk } from "../../redux/instrument";
import { getOrderByUserThunk } from "../../redux/cart";
import { handleAddToCart } from "../LandingPage/LandingPage";
import { GoHeartFill } from "react-icons/go";
import { getUserFavThunk, removeFavThunk, addToFavoriteThunk } from '../../redux/favorite'
import './Category.css'



export default function Category() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { category } = useParams()
  const user = useSelector(state => state.session.user)
  const instruments = useSelector(state => state.instruments?.SelectedInstruments)
  const orders = useSelector(state => state.orders?.CurrentOrders)
  const favorites = useSelector(state => state.favorites?.MyFavorites)
  const favoriteInstIds = favorites?.map(ele => ele.instrument_id)

  const [toFav, setToFav] = useState(false)
  const [removeFav, setRemoveFav] = useState(false)

  useEffect(() => {
    dispatch(getInstrumentsByCategoryThunk(category))
    dispatch(getOrderByUserThunk())
    dispatch(getUserFavThunk())
    setToFav(false)
    setRemoveFav(false)
  }, [dispatch, category, toFav, removeFav])

  let isDisable = true
  if (user) {
    isDisable = false
  }

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
      <h1>{category}</h1>
      <section className="category-container">
        {instruments?.length > 0 ? instruments?.map((eachInst) => (
          <section className="instrument-container category-link-container" key={eachInst?.id}>
            <NavLink className="instrument-dtl-container"  to={`/instruments/${eachInst?.id}`}>
              <img className="instrument-image" src={eachInst?.image_url} />
            </NavLink>
            <div className="category-inst-info-container">
              <h3>{eachInst?.model}</h3>
              <p className="inst-dtl-text">${eachInst?.price}</p>
              <h4 className="inst-dtl-text">{eachInst?.color}</h4>
              {eachInst?.is_used ? (
                <p className="inst-dtl-text">Pre-owned</p>
              ) : (
                <p className="inst-dtl-text">New</p>
              )}
            </div>
            <div className="inst-details-text">
              <p className="inst-dtl-text">{eachInst?.details}</p>
            </div>
            <div className="my-inst-item-btn-container">
              <button className={`dtl-fav-btn ${favoriteInstIds?.includes(eachInst?.id) ? 'favorite' : ''} category-fav-btn`}
                onClick={() => handleFav(eachInst?.id, eachInst)}
              >
                <GoHeartFill className={`dtl-fav-icon ${favoriteInstIds?.includes(eachInst?.id) ? 'favorite' : ''}`} />
              </button>
              {eachInst?.seller_id == user?.id ? (
                <button className="category-add-to-cart-button">
                  <NavLink className='category-add-to-cart-text' to={`/instruments/${eachInst?.id}/update`}>
                    Update
                  </NavLink>
                </button>

              ) : (
                <button
                  className={`category-add-to-cart-button ${user ? '' : 'disabled'}`}
                  onClick={() => handleAddToCart(eachInst.id, orders, dispatch, nav)}
                  disabled={isDisable}
                >
                  <NavLink className='category-add-to-cart-text'>
                    Add to Cart
                  </NavLink>
                </button>
              )}
            </div>
          </section>

        )) : (
          <h3>We currently don&apos;t have any instruments under this category</h3>
        )}
      </section>
    </div>
  )
}
