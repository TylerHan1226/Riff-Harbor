
import { NavLink } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";

export const InstrumentCard = ({ eachInst, favoriteInstIds, user, orders, isDisable, handleFav, handleAddToCart, dispatch, nav }) => (
    <section className="instrument-container">
      <NavLink className="instrument-dtl-container" to={`/instruments/${eachInst?.id}`}>
        <img className="instrument-image" src={eachInst?.image_url} />
      </NavLink>
      <div className="category-inst-info-container">
        <h3>{eachInst?.model}</h3>
        <p className="black-text">${eachInst?.price}</p>
        <h4 className="black-text">{eachInst?.color}</h4>
        {eachInst?.is_used ? (
          <p className="black-text">Pre-owned</p>
        ) : (
          <p className="black-text">New</p>
        )}
      </div>
      <div className="inst-details-text">
        <p className="black-text">{eachInst?.details}</p>
      </div>
      <div className="my-inst-item-btn-container">
        <button className={`dtl-fav-btn ${favoriteInstIds?.includes(eachInst?.id) ? 'favorite' : ''} category-fav-btn`}
          onClick={() => handleFav(eachInst?.id, eachInst)}
        >
          <GoHeartFill className={`dtl-fav-icon ${favoriteInstIds?.includes(eachInst?.id) ? 'favorite' : ''}`} />
        </button>
        {eachInst?.seller_id == user?.id ? (
          <button className="category-add-to-cart-button">
            <NavLink className='category-add-to-cart-text' to={`/instruments/${eachInst?.id}/update`}>
              Update
            </NavLink>
          </button>
        ) : (
          <button
            className={`category-add-to-cart-button ${user ? '' : 'disabled'}`}
            onClick={() => handleAddToCart(eachInst.id, orders, dispatch, nav)}
            disabled={isDisable}
          >
            <NavLink className='category-add-to-cart-text'>
              Add to Cart
            </NavLink>
          </button>
        )}
      </div>
    </section>
  );


export const handleFav = (instrumentId, instrument) => {
  if (favoriteInstIds.includes(instrumentId)) {
    const favToRemove = favorites.filter(fav => fav.instrument_id == instrumentId)[0]
    dispatch(removeFavThunk(favToRemove.id))
    alert(`Removed ${instrument.model} from favorites`)
    setToFav(true)
  } else {
    const newFav = { "instrument_id": instrumentId }
    dispatch(addToFavoriteThunk(newFav))
    alert(`Successfully added ${instrument.model} to favorites!`)
    setRemoveFav(true)
  }
}