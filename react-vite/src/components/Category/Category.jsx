
// import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getInstrumentsByCategoryThunk } from "../../redux/instrument";
import { getOrderByUserThunk } from "../../redux/cart";
import { handleAddToCart } from "../LandingPage/LandingPage";




export default function Category() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { category } = useParams()
  const user = useSelector(state => state.session)
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
      {instruments?.length > 0 ? instruments?.map((eachInst) => (
        <div className="instrument-container" key={eachInst?.id}>
          <div className="instrument-dtl-container">
            <NavLink to={`${eachInst?.id}`}>
              <img className="instrument-image" src={eachInst?.image_url} />
            </NavLink>
          </div>
          <div className="instrument-dtl-container">
            <h4 className="inst-dtl-text">{eachInst?.model}</h4>
            <p className="inst-dtl-text">{eachInst?.category}</p>
            <p className="inst-dtl-text">${eachInst?.price}</p>
            {eachInst?.is_used ? (
              <p className="inst-dtl-text">Pre-owned</p>
            ) : (
              <p className="inst-dtl-text">New</p>
            )}
          </div>
          <div className="my-inst-item-btn-container">
            {eachInst?.seller_id == user?.id ? (
              <button className="add-to-cart-button">
                <NavLink className='add-to-cart-text' to={`instruments/${eachInst?.id}/update`}>
                  Update
                </NavLink>
              </button>
            ) : (
              <button
                className={`add-to-cart-button ${user ? '' : 'disabled'}`}
                onClick={() => handleAddToCart(eachInst.id, orders, dispatch, nav)}
                disabled={isDisable}
              >
                <NavLink className='add-to-cart-text'>
                  Add to Cart
                </NavLink>
              </button>
            )}
          </div>

        </div>
      )) : (
        <h3>We currently don't have any instruments under this category</h3>
      )}
    </div>
  )
}
