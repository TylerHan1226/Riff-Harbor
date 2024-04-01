
// import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllInstrumentsThunk } from '../../redux/instrument'
import { createOrderThunk, getOrderByUserThunk } from "../../redux/cart";

import "./LandingPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaDice } from "react-icons/fa6";


export default function LandingPage() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const instruments = useSelector(state => state.instruments)
  const orders = useSelector(state => state.orders?.CurrentOrders)

  const [randomInstruments, setRandomInstruments] = useState([])

  useEffect(() => {
    dispatch(getAllInstrumentsThunk())
    dispatch(getOrderByUserThunk())
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
  const handleAddToCart = (instrumentId) => {
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
      nav('orders/MyOrders')
    }
  }



  return (
    <div className="page-container">
      <div id="trending-container">
        <div>
          <h1>Gallery</h1>
          <div id='dice-container' >
            <FaDice id='dice-icon' onClick={handleRandomizeInstClick} />
            <p id='dice-text'>click to randomize</p>
          </div>
        </div>
        <div className="trending-instruments-container">
          {randomInstruments.length > 0 && randomInstruments?.map((eachInst) => (
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
                {eachInst?.seller_id == user?.id ? (
                  <button className="add-to-cart-button">
                    <NavLink className='add-to-cart-text' to={`instruments/${eachInst?.id}/update`}>
                      Update
                    </NavLink>
                  </button>
                ) : (
                  <button
                    className={`add-to-cart-button ${user ? '' : 'disabled'}`}
                    onClick={() => handleAddToCart(eachInst.id)}
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

    </div>
  );
}
