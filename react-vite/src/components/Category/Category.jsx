
// import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getInstrumentsByCategoryThunk } from "../../redux/instrument";




export default function Category() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { category } = useParams()
  console.log('category ==>', category)

  const instruments = useSelector(state => state.instruments?.SelectedInstruments)
  console.log('instruments ==>', instruments)

  useEffect(() => {
    dispatch(getInstrumentsByCategoryThunk(category))
  }, [dispatch, category])

  return (
            <div className="page-container">
                <h1>{category}</h1>
            </div>
  )
}
