import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

import { GiGuitarBassHead } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdSailing } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
// import { useState } from "react";

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
        <div className="nav-action-button-container">
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
        </div>
      }

      <div className="nav-icons-container">
        {user &&
        <>
          <div className="nav-cart-container">
            <NavLink to='/orders/MyOrders'>
              <FaShoppingCart className='nav-user-action-icon' />
            </NavLink>
          </div>
          <div>
          <NavLink to='/favorites'>
              <GoHeartFill className='nav-user-action-icon' />
            </NavLink>
          </div>
          </>
        }
        <div className="nav-profile-container">
          <ProfileButton className='nav-profile-btn' />
        </div>
      </div>


    </div>
  );
}
