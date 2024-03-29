import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getOrderByUserThunk } from "../../redux/cart";
import './Orders.css'


export default function MyOrders() {


    return (
        <h1>My Orders</h1>
    )
}