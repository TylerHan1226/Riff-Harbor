
// import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllInstrumentsThunk } from '../../redux/instrument'
import { createOrderThunk, getOrderByUserThunk } from "../../redux/cart";

import "./LandingPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaDice } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { addToFavorite, getUserFavThunk, removeFavThunk } from "../../redux/favorite";

export const handleAddToCart = (instrumentId, orders, dispatch, nav) => {
  const orderInstIds = orders.map(ele => ele.instrument_id)
  //check if already added item to the cart
  if (orderInstIds.includes(instrumentId)) {
    alert("This instrument is already in your cart! You can change the quantity in your cart page.")
  } else {
    const newOrder = {
      instrument_id: instrumentId
    }
    dispatch(createOrderThunk(newOrder))
    alert("You've placed the order successfully!")
    nav('/orders/MyOrders')
  }
}


export default function LandingPage() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const instruments = useSelector(state => state.instruments)
  const orders = useSelector(state => state.orders?.CurrentOrders)
  const favorites = useSelector(state => state.favorites?.MyFavorites)

  const [randomInstruments, setRandomInstruments] = useState([])

  useEffect(() => {
    dispatch(getAllInstrumentsThunk())
    dispatch(getOrderByUserThunk())
    dispatch(getUserFavThunk())
  }, [dispatch])

  useEffect(() => {
    if (instruments && instruments.Instruments) {
      getRandomized()
    }
  }, [instruments])

  if (!instruments) {
    return <h2>loading...</h2>
  }

  const allInstruments = instruments.Instruments
  const allInstIds = allInstruments?.map(ele => ele.id)

  // generate random instrument ids
  function randomIdGenerator(arr, count) {
    const shuffledArr = arr.sort(() => Math.random() - 0.5)
    return shuffledArr.slice(0, count)
  }
  // helper
  function getRandomized() {
    const randomIds = randomIdGenerator(allInstIds, 12)
    const newRandomInstruments = allInstruments?.sort(() => Math.random() - 0.5).filter(ele => randomIds.includes(ele.id))
    setRandomInstruments(newRandomInstruments)
  }
  //randomize button
  const handleRandomizeInstClick = () => {
    getRandomized()
  }

  //add to cart button
  let isDisable = true
  if (user) {
    isDisable = false
  }

  const handleCategory = (selectedCategory) => {
    nav(`instruments/category/${selectedCategory}`)
  }

  // handle favorite
  const favoriteInstIds = favorites?.map(ele => ele.instrument_id)
  let isFav = false
  const handleFav = (instrumentId) => {
    if (favoriteInstIds.includes(instrumentId)) {
      const favToRemove = favorites.filter(fav => fav.instrument_id == instrumentId)[0]
      dispatch(removeFavThunk(favToRemove.id))
    } else {
      const newFav = {"instrument_id": instrumentId}
      isFav = true
      dispatch(addToFavorite(newFav))
    }
  }

  return (
    <div className="page-container">
      <div id="landing-container">
        <div className="landing-header-actions">
          <h1>Category</h1>
          <div className="header-tabs-container">
            <div className="header-category">
              <button className="category-tabs" onClick={() => handleCategory('Electric Guitar')}>
                <img
                  src='https://res.cloudinary.com/do8l6gpqp/image/upload/v1712348805/Riff-Harbor/ESP_e-g_bbjtj0.jpg'
                  alt='Electric Guitar Category'
                  className="category-tab-image"
                />
              </button>
              <h3>Electric Guitars</h3>
            </div>

            <div className="header-category">
              <button className="category-tabs" onClick={() => handleCategory('Acoustic Guitar')}>
                <img
                  src='https://res.cloudinary.com/do8l6gpqp/image/upload/v1712348948/Riff-Harbor/lake_a-g_ouk3gj.jpg'
                  alt='Acoustic Guitar Category'
                  className="category-tab-image"
                />
              </button>
              <h3>Acoustic Guitars</h3>
            </div>

            <div className="header-category">
              <button className="category-tabs" onClick={() => handleCategory('Bass')}>
                <img
                  src='https://res.cloudinary.com/do8l6gpqp/image/upload/v1712348949/Riff-Harbor/ESP_b_ak9opy.jpg'
                  alt='Bass Category'
                  className="category-tab-image"
                />
              </button>
              <h3>Basses</h3>
            </div>

          </div>
        </div>
      </div>

      <div className="landing-header-actions">
        <h1>Gallery</h1>
        <div id='dice-container' >
          <FaDice id='dice-icon' onClick={handleRandomizeInstClick} />
          <p id='dice-text'>click to randomize</p>
        </div>
      </div>

      <div className="landing-instruments-container"> 
        {randomInstruments.length > 0 && randomInstruments?.map((eachInst) => (
          <div className="instrument-container" key={eachInst?.id}>
            <div className="instrument-dtl-container">
              <button className={`landing-fav-btn ${favoriteInstIds?.includes(eachInst?.id) || isFav ? 'favorite' : ''}`}
                onClick={() => handleFav(eachInst?.id)}
              >
                <GoHeartFill className={`landing-fav-icon ${favoriteInstIds?.includes(eachInst?.id) || isFav ? 'favorite' : ''}`} />
              </button>
              <NavLink className='landing-page-inst-image-container' to={`instruments/${eachInst?.id}`}>
                <img className="instrument-image" src={eachInst?.image_url} />
              </NavLink>
            </div>
            <div className="instrument-dtl-container">
              <h4 className="inst-dtl-text">{eachInst?.model}</h4>
              <p className="inst-landing-dtl-text">{eachInst?.category}</p>
              <p className="inst-landing-dtl-text">${eachInst?.price}</p>
              {eachInst?.is_used ? (
                <p className="inst-landing-dtl-text">Pre-owned</p>
              ) : (
                <p className="inst-landing-dtl-text">New</p>
              )}
              {eachInst?.seller_id == user?.id ? (
                <button className="add-to-cart-button">
                  <NavLink className='add-to-cart-text' to={`instruments/${eachInst?.id}/update`}>
                    Update
                  </NavLink>
                </button>
              ) : (
                <button
                  className={`add-to-cart-button ${user ? '' : 'disabled'}`}
                  onClick={() => handleAddToCart(eachInst.id, orders, dispatch, nav)}
                  disabled={isDisable}
                >
                  <NavLink className='add-to-cart-text'>
                    Add to Cart
                  </NavLink>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
