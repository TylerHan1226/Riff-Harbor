
// import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getInstrumentsByCategoryThunk } from "../../redux/instrument";
import { getOrderByUserThunk } from "../../redux/cart";
import { handleAddToCart } from "../LandingPage/LandingPage";
import './Category.css'



export default function Category() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { category } = useParams()
  const user = useSelector(state => state.session.user)
  const instruments = useSelector(state => state.instruments?.SelectedInstruments)
  const orders = useSelector(state => state.orders?.CurrentOrders)

  useEffect(() => {
    dispatch(getInstrumentsByCategoryThunk(category))
    dispatch(getOrderByUserThunk())
  }, [dispatch, category])

  let isDisable = true
  if (user) {
    isDisable = false
  }

  return (
    <div className="page-container">
      <h1>{category}</h1>
      <div className="category-container">
        {instruments?.length > 0 ? instruments?.map((eachInst) => (
          <NavLink className="instrument-container category-link-container" key={eachInst?.id} to={`/instruments/${eachInst?.id}`}>
            <div className="instrument-dtl-container">
              <img className="instrument-image" src={eachInst?.image_url} />
            </div>
            <div className="category-inst-info-container">
              <h3>{eachInst?.model}</h3>
              <p className="inst-dtl-text">${eachInst?.price}</p>
              <h4 className="inst-dtl-text">{eachInst?.color}</h4>
              {eachInst?.is_used ? (
                <p className="inst-dtl-text">Pre-owned</p>
              ) : (
                <p className="inst-dtl-text">New</p>
              )}
            </div>
            <div className="inst-details-text">
              <p className="inst-dtl-text">{eachInst?.details}</p>
            </div>
            <div className="my-inst-item-btn-container">
              {eachInst?.seller_id == user?.id ? (
                <button className="category-add-to-cart-button">
                  <NavLink className='category-add-to-cart-text' to={`instruments/${eachInst?.id}/update`}>
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
          </NavLink>

        )) : (
          <h3>We currently don&apos;t have any instruments under this category</h3>
        )}
      </div>
    </div>
  )
}
