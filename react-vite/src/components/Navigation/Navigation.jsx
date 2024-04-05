import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

import { GiGuitarBassHead } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdSailing } from "react-icons/md";
import { useState } from "react";

export default function Navigation() {

  const user = useSelector(state => state.session.user)

  const [searchText, setSearchText] = useState('')
  console.log(searchText)
  const handleSearch = () => {
    console.log(searchText)
  }

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

      {/* <div>
        <form className='search-bar-form'
          onSubmit={handleSearch}
        >
          <label>
            Search Bar
            <input
              type='text'
              name='search'
              value={searchText}
              placeholder="Search"
              onChange={e => setSearchText(e.target.value)}
              className='search-bar-filed'
            />
            <button className="search-bar-btn" type='submit'>
              submit
            </button>
          </label>
        </form>
      </div> */}

      {user &&
        <>
          <button className="nav-action-button">
            <NavLink className='nav-action-button-text' to={`/instruments/${user.id}/MyInstruments`}>
              My Instruments
            </NavLink>
          </button>
          <button className="nav-action-button">
            <NavLink className='nav-action-button-text' to='/instruments/new'>
              Sell Your Gear!
            </NavLink>
          </button>
        </>
      }

      <div className="nav-cartProfile-container">
        {user &&
          <div className="nav-cart-container">
            <NavLink to='orders/MyOrders'>
              <FaShoppingCart id='nav-cart' />
            </NavLink>
          </div>
        }
        <div className="nav-profile-container">
          <ProfileButton className='nav-profile-btn' />
        </div>
      </div>


    </div>
  );
}
