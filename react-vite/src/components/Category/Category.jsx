
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
import Loading from "../Loading/Loading";



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

  // Filters
  // brand filter
  const [brand, setBrand] = useState('')
  if (brand !== '') instruments = instruments.filter(ele => ele.make == brand)
  // condition filter
  const [isUsed, setIsUsed] = useState(null)
  const handleCondition = (condition) => {
    if ((isUsed == true && condition == true) || (isUsed == false && condition == false)) {
      setIsUsed(null)
    } else {
      setIsUsed(condition)
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
 
  if (!category) {
    return <Loading />
  }

  return (
    <div className="page-container">
      <h1>{category}</h1>
      <div className="category-container">

        <section className="category-filter-container">

          <div className="filter-containers">
            <h2>Brand</h2>
            <div className="brand-filter-container">
              <div className="brand-filters">
                <input className="radio-dot" type='radio' name='brands' value='' onChange={() => setBrand('')}></input>
                <label className="brand-filter-labels">All</label>
              </div>
              <div className="brand-filters">
                <input className="radio-dot" type='radio' name='brands' value='B.C. Rich' onChange={() => setBrand('B.C. Rich')}></input>
                <label className="brand-filter-labels">B.C. Rich</label>
              </div>
              <div className="brand-filters">
                <input className="radio-dot" type='radio' name='brands' value='Martin' onChange={() => setBrand('Ernie Ball')}></input>
                <label className="brand-filter-labels">Ernie Ball</label>
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
                <input className="radio-dot" type='radio' name='brands' value='Martin' onChange={() => setBrand('Martin')}></input>
                <label className="brand-filter-labels">Martin</label>
              </div>
              <div className="brand-filters">
                <input className="radio-dot" type='radio' name='brands' value='PRS' onChange={() => setBrand('PRS')}></input>
                <label className="brand-filter-labels">PRS</label>
              </div>
              <div className="brand-filters">
                <input className="radio-dot" type='radio' name='brands' value='Schecter' onChange={() => setBrand('Schecter')}></input>
                <label className="brand-filter-labels">Schecter</label>
              </div>
              <div className="brand-filters">
                <input className="radio-dot" type='radio' name='brands' value='Taylor' onChange={() => setBrand('Taylor')}></input>
                <label className="brand-filter-labels">Taylor</label>
              </div>
            </div>
          </div>

          <div className="filter-containers">
            <h2>Price</h2>
            <div className="filter-price-input-container">
              <label className="filter-price-labels">
                <input className="filter-price-text-bar" type="text" placeholder="$ Min" value={minPrice} onChange={handleMinPriceChange} />
              </label>
              <label>-</label>
              <label className="filter-price-labels">
                <input className="filter-price-text-bar" type="text" placeholder="$ Max" value={maxPrice} onChange={handleMaxPriceChange} />
              </label>
            </div>
          </div>

          <div className="filter-containers">
            <h2>Condition</h2>
            <div className="filter-condition-input-container">
              <button className={`filter-condition-btn ${isUsed == false ? 'selected' : ''}`} onClick={() => handleCondition(false)}>
                New
              </button>
              <button className={`filter-condition-btn ${isUsed == true ? 'selected' : ''}`} onClick={() => handleCondition(true)}>
                Pre-owned
              </button>
            </div>
          </div>

        </section>

        <section className="category-instrument-container">
          {instruments?.length > 0 ? instruments?.map((eachInst) => (
            <section className="instrument-container" key={eachInst?.id}>
              <NavLink className="instrument-dtl-container" to={`/instruments/${eachInst?.id}`}>
                <img className="instrument-image" src={eachInst?.image_url} />
              </NavLink>
              <div className="category-inst-info-container">
                <h3>{eachInst?.model}</h3>
                <p className="black-text">${eachInst?.price}</p>
                <h4 className="black-text">{eachInst?.color}</h4>
                {eachInst?.is_used ? (
                  <p className="black-text">Pre-owned</p>
                ) : (
                  <p className="black-text">New</p>
                )}
              </div>
              <div className="inst-details-text">
                <p className="black-text">{eachInst?.details}</p>
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
            <h3>Sorry, we could&apos;t find a match for this search</h3>
          )}
        </section>
      </div>
    </div>
  )
}
