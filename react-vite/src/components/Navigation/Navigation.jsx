import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

import { GiGuitarBassHead } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdSailing } from "react-icons/md";

export default function Navigation() {

  const user = useSelector(state => state.session.user)

  return (
    <div className="nav-container">

      <div id='nav-home'>
        <NavLink to="/">
          <GiGuitarBassHead id='nav-icon' />
        </NavLink>
        <h1 id='nav-site-name'>
            Riff Harbor
        </h1>
        <MdSailing className="nav-text-icon" />
      </div>



      <div>
        Search Bar
      </div>

      {user &&
        <>
          <button className="nav-action-button">
            <NavLink className='nav-action-button-text' to={`/instruments/${user.id}/MyInstruments`}>My Instruments</NavLink>
          </button>
          <button className="nav-action-button">
            <NavLink className='nav-action-button-text' to='/instruments/new'>Sell Your Gear!</NavLink>
          </button>
        </>
      }

      <div>
        <ProfileButton />
      </div>

      <div>
        <NavLink to='orders/MyOrders'>
          <FaShoppingCart id='nav-cart' />
        </NavLink>
      </div>

    </div>
  );
}
