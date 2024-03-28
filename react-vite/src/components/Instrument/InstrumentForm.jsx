import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
// import "./Instrument.css";

export default function InstrumentForm() {

    const dispatch = useDispatch()
    const nav = useNavigate()

    const user = useSelector(state => state.session.user)
    const { instrumentId } = useParams()
    console.log('user ==>', user)
    console.log('instrumentId ==>', instrumentId)
    

    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState()
    const [details, setDetails] = useState('')
    const [body, setBody] = useState('')
    const [fretboard, setFretboard] = useState('')
    const [make, setMake] = useState('')
    const [is_used, setUsed] = useState('')
    const [validations, setValidations] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (!user) {
            nav('/')
        }
        
    })

    return (
            <form className='form-container'>
                <h1>Create!</h1>
            </form>
    );
}

