import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-container">

      <div>
        <NavLink to="/">Home</NavLink>
      </div>

      <div>
        Search Bar
      </div>

      <button>
        <NavLink to='/instruments/new'>Sell Your Gear!</NavLink>
      </button>

      <div>
        <ProfileButton />
      </div>

    </div>
  );
}

export default Navigation;
