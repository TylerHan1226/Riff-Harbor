// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllInstrumentsThunk } from '../../redux/instrument'
import "./LandingPage.css";
import { NavLink } from "react-router-dom";
import { FaDice } from "react-icons/fa6";

export default function LandingPage() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const instruments = useSelector(state => state.instruments)

  const [randomInstruments, setRandomInstruments] = useState([])

  useEffect(() => {
    dispatch(getAllInstrumentsThunk())
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
  const numOfInstruments = allInstruments?.length

  // generate random instrument ids
  function randomIdGenerator(count) {
    let numArr = Array.from({ length: numOfInstruments }, (_, i) => i + 1)
    for (let i = numArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      if (j) {
        [numArr[i], numArr[j]] = [numArr[j], numArr[i]]
      }
    }
    return numArr.slice(1, count)
  }
  // helper
  function getRandomized() {
    const randomIds = randomIdGenerator(13)
    const newRandomInstruments = allInstruments?.sort(() => Math.random() - 0.5).filter(ele => randomIds.includes(ele.id))
    setRandomInstruments(newRandomInstruments)
  }
  //randomize button
  const handleRandomizeInstClick = () => {
    getRandomized()
  }

  console.log('user ==>', user)
  console.log('randomInstruments ==>', randomInstruments)




  return (
    <div id='landing-page-container'>
      <div id="trending-container">
        <div>
          <h1>Gallery</h1>
          <button id='dice-button' onClick={handleRandomizeInstClick}>
            <FaDice id='dice-icon' />
            <p id='dice-text'>click to randomize</p>
          </button>
        </div>
        <div className="trending-instruments-container">
          {randomInstruments.length > 0 && randomInstruments?.map((eachInst) => (
            <div className="instrument-container" key={eachInst.id}>
              <div className="instrument-dtl-container">
                <NavLink to={`instruments/${eachInst.id}`}>
                  <img className="instrument-image" src={eachInst.image_url} />
                </NavLink>
              </div>
              <div className="instrument-dtl-container">
                <h4>{eachInst.model}</h4>
                <p className="inst-dtl-text">{eachInst.category}</p>
                <p className="inst-dtl-text">${eachInst.price}</p>
                {eachInst.is_used ? (
                  <p className="inst-dtl-text">Pre-owned</p>
                ) : (
                  <p className="inst-dtl-text">New</p>
                )}
                {eachInst.seller_id == user.id ? (
                  <button className="add-to-cart-button">
                    <NavLink className='add-to-cart-text' to={`instruments/${eachInst.id}/update`}>
                      Update
                    </NavLink>
                  </button>
                ) : (
                  <button className="add-to-cart-button">
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
