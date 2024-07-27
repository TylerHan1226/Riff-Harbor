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
    <div id="nav">

      <section className="nav-container">

        <div id='nav-home'>
          <NavLink to="/">
            <GiGuitarBassHead id='nav-icon' />
          </NavLink>
          <h1 id='nav-site-name'>
            Riff Harbor
          </h1>
          <MdSailing className="nav-text-icon" />
        </div>

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
            <button className="nav-action-button">
              <NavLink className='nav-action-button-text' to='/news/1'>
                News
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
      </section>

      <section id="nav-search-bar-container">
          <button className="search-bar">Search</button>
      </section>


    </div>

  );
}
