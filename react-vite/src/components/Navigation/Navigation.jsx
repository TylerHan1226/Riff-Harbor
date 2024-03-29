import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

import { GiGuitarBassHead } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";

export default function Navigation() {

  const user = useSelector(state => state.session.user)

  return (
    <div className="nav-container">

      <div>
        <NavLink to="/">
          <GiGuitarBassHead id='nav-icon' />
        </NavLink>
      </div>

      <div>
        Search Bar
      </div>

      <button className="nav-action-button">
        <NavLink className='nav-action-button-text' to='/instruments/new'>Sell Your Gear!</NavLink>
      </button>

      {user &&
      <button className="nav-action-button">
        <NavLink className='nav-action-button-text' to={`/instruments/${user.id}/MyInstruments`}>My Instruments</NavLink>
      </button>}

      <div>
        <ProfileButton />
      </div>

      <div>
        <NavLink>
          <FaShoppingCart id='nav-cart' />
        </NavLink>
      </div>

    </div>
  );
}
