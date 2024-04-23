
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
  let instruments = useSelector(state => state.instruments?.SelectedInstruments)
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

  // Filters
  const [brand, setBrand] = useState('')

  console.log('brand ==>', brand)
  if (brand !== '') instruments = instruments.filter(ele => ele.make == brand)

  return (
    <div className="page-container">
      <h1>{category}</h1>
      <div className="category-container">

        <section className="category-filter-container">

          <div className="filter-containers">
            <h2>Brand</h2>
            <div className="brand-filter-container">
            <div className="brand-filters">
              <input  className="radio-dot" type='radio' name='brands' value='' onChange={() => setBrand('')}></input>
              <label className="brand-filter-labels">All</label>
            </div>
            <div className="brand-filters">
              <input className="radio-dot" type='radio' name='brands' value='B.C. Rich' onChange={() => setBrand('B.C. Rich')}></input>
              <label className="brand-filter-labels">B.C. Rich</label>
            </div>
            <div className="brand-filters">
              <input className="radio-dot" type='radio' name='brands' value='ESP' onChange={() => setBrand('ESP')}></input>
              <label className="brand-filter-labels">ESP</label>
            </div>
            <div className="brand-filters">
              <input className="radio-dot" type='radio' name='brands' value='Fender' onChange={() => setBrand('Fender')}></input>
              <label className="brand-filter-labels">Fender</label>
            </div>
            <div className="brand-filters">
              <input className="radio-dot" type='radio' name='brands' value='Gibson' onChange={() => setBrand('Gibson')}></input>
              <label className="brand-filter-labels">Gibson</label>
            </div>
            <div className="brand-filters">
              <input className="radio-dot" type='radio' name='brands' value='Jackson' onChange={() => setBrand('Jackson')}></input>
              <label className="brand-filter-labels">Jackson</label>
            </div>
            <div className="brand-filters">
              <input className="radio-dot" type='radio' name='brands' value='PRS' onChange={() => setBrand('PRS')}></input>
              <label className="brand-filter-labels">PRS</label>
            </div>
            <div className="brand-filters">
              <input className="radio-dot" type='radio' name='brands' value='Schecter' onChange={() => setBrand('Schecter')}></input>
              <label className="brand-filter-labels">Schecter</label>
            </div>
            </div>
          </div>

          <div className="filter-containers">
            <h2>Price</h2>
          </div>

          <div className="filter-containers">
            <h2>Condition</h2>
          </div>

        </section>

        <section className="category-instrument-container">
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
    </div>
  )
}
