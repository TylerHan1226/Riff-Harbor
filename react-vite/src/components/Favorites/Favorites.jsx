
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getInstrumentsByCategoryThunk } from "../../redux/instrument";
import { getOrderByUserThunk } from "../../redux/cart";
import { handleAddToCart } from "../LandingPage/LandingPage";
import { getUserFavThunk } from "../../redux/favorite";

import './Favorites.css'



export default function Favorites() {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const favorites = useSelector(state => state.favorites?.FavInst)
    const user = useSelector(state => state.session.user)

    if (!user) {
        nav('/')
    }

    console.log('favorites ==>', favorites)

    useEffect(() => {
        dispatch(getUserFavThunk())
    }, [dispatch])

    return (
        <div className="page-container">
            <h1>Fav!</h1>

            <section className="fav-instruments-container">
                {favorites?.map(instrument => (
                    <div className="fav-instrument" key={instrument.id}>
                        <img className="fav-inst-img" src={instrument.image_url} />
                    </div>
                ))}

            </section>
        </div>
    )
}
