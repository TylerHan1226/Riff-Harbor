import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { createInstrumentThunk } from "../../redux/instrument";
// import "./Instrument.css";

export default function InstrumentForm({ buttonName, instrument }) {

    const dispatch = useDispatch()
    const nav = useNavigate()

    const user = useSelector(state => state.session.user)
    const { instrumentId } = useParams()
    console.log('user ==>', user)
    console.log('instrumentId ==>', instrumentId)

    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState()
    const [details, setDetails] = useState('')
    const [body, setBody] = useState('')
    const [fretboard, setFretboard] = useState('')
    const [is_used, setUsed] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [validations, setValidations] = useState({})
    const [submitted, setSubmitted] = useState(false)

    let isValidated = false
    useEffect(() => {
        if (!user) {
            nav('/')
        }
        const errors = {}
        if (!make || make.length > 100) {
            errors.make = 'Make is required and must be under 100 characters'
        }
        if (!model || model.length > 100) {
            errors.model = 'model is required and must be under 100 characters'
        }
        if (!color || color.length > 100) {
            errors.color = 'Color is required and must be under 100 characters'
        }
        if (!category || !['Electric Guitar', 'Acoustic Guitar', 'Bass'].includes(category)) {
            errors.category = 'This field is required and must be one of the following: Electric Guitar, Acoustic Guitar, Bass.'
        }
        if (!price || price <= 0) {
            errors.price = 'Price is required and must be greater than 0'
        }
        if (!details || details.length < 25) {
            errors.details = 'Details is required and must be greater than 25 characters'
        }
        if (details.length >= 900) {
            errors.details = 'Details cannot be greater than 900 characters'
        }
        if (!body || body.length > 100) {
            errors.body = 'Body material is required and must be under 100 characters'
        }
        if (!fretboard || fretboard.length > 100) {
            errors.fretboard = 'Fretboard material is required and must be under 100 characters'
        }
        if (!is_used) {
            errors.is_used = 'New/Pre-owned field is required'
        }
        if (!image_url) {
            errors.image_url = 'Image URL is required'
        }
        if (image_url >= 900) {
            errors.image_url = 'Image URL cannot be more than 900 characters'
        }

        setValidations(errors)
        if (Object.keys(validations).length) {
            isValidated = true
        }

    }, [submitted, make, model, color, category, price, details, body, fretboard, is_used])
    //DO NOT PUT VALIDATIONS IN THE DEPENDENCY

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        const newInstrument = {
            make, model, color, category, price, details, body, fretboard, is_used, image_url
        }

        if (!instrumentId) {
            const instrumentCreated = await dispatch(createInstrumentThunk(newInstrument))
            if (instrumentCreated.id) {
                nav(`/instruments/${instrumentCreated.id}`)
            }
        }
    }


    return (
        <form className='form-container'>
            <h1>Create!</h1>
            <button className="submit-form-button" type='submit' disabled={isValidated}>{buttonName}</button>
        </form>
    );
}

