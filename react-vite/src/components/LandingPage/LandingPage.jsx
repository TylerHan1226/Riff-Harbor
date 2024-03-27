// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllInstrumentsThunk } from '../../redux/instrument'
import "./LandingPage.css";

function LandingPage() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.session)
  const instruments = useSelector((state) => state.instruments)

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
    <h2>loading...</h2>
  }

  const allInstruments = instruments.Instruments
  const numOfInstruments = allInstruments?.length
  // console.log('user ==>', user)

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
  function getRandomized () {
    const randomIds = randomIdGenerator(13)
    const newRandomInstruments = allInstruments?.filter(ele => randomIds.includes(ele.id))
    setRandomInstruments(newRandomInstruments)
  }

  //randomize button
  const handleRandomizeInstClick = () => {
    getRandomized()
  }





  return (
    <div id='landing-page-container'>
      <div id="trending-container">
        <div>
          <h1>Trending</h1>
          <button onClick={handleRandomizeInstClick}>Randomize Instruments</button>
        </div>
        <div className="trending-instruments-container">
          {randomInstruments.length > 0 && randomInstruments?.map((eachInst) => (
            <div className="instrument-container" key={eachInst.id}>
              <div className="instrument-dtl-container">
                <img className="instrument-image" src={eachInst.image_url} />
              </div>
              <div className="instrument-dtl-container">
                <p className="inst-dtl-text">{eachInst.model}</p>
                <p className="inst-dtl-text">{eachInst.color}</p>
                <p className="inst-dtl-text">{eachInst.price}</p>
                {{eachInst} ? (
                  <p className="inst-dtl-text">New</p>
                ) : (
                  <p className="inst-dtl-text">Pre-owned</p>
                )}
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


export default LandingPage;
