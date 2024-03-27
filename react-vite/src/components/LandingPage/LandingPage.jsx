// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllInstrumentsThunk } from '../../redux/instrument'
import "./LandingPage.css";

function LandingPage() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.session)
  const instruments = useSelector((state) => state.instruments)
  
  if (user && instruments) {
    console.log('user ==>', user)
    console.log('instruments ==>', instruments)
  }

  useEffect(() => {
    dispatch(getAllInstrumentsThunk())
  }, [dispatch])



  return (
    <>
        <h1>Landing!</h1>
    </>
  );
}

export default LandingPage;
