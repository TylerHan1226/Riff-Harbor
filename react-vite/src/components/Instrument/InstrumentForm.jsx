import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getOneInstrumentThunk, createInstrumentThunk, updateInstrumentThunk } from "../../redux/instrument";
// import "./Instrument.css";

export default function InstrumentForm({ buttonName}) {

    const dispatch = useDispatch()
    const nav = useNavigate()

    const user = useSelector(state => state.session.user)
    const instrument = useSelector(state => state.instruments)
    const { instrumentId } = useParams()
    console.log('instrument ==>', instrument)


    const [make, setMake] = useState(instrument?.make)
    const [model, setModel] = useState(instrument?.model)
    const [color, setColor] = useState(instrument?.color)
    const [category, setCategory] = useState(instrument?.category)
    const [price, setPrice] = useState(instrument?.price)
    const [details, setDetails] = useState(instrument?.details)
    const [body, setBody] = useState(instrument?.body)
    const [fretboard, setFretboard] = useState(instrument?.fretboard)
    const [is_used, setIsUsed] = useState(instrument?.is_used)
    const [image_url, setImageUrl] = useState(instrument?.image_url)
    const [validations, setValidations] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        dispatch(getOneInstrumentThunk(instrumentId))
    }, [dispatch, instrumentId])

    let isValidated = false
    useEffect(() => {
        if (!user) {
            nav('/')
        }
        const errors = {}
        if (submitted) {
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
            if (!price || price <= 0 || typeof price != 'number') {
                errors.price = 'Price is required and must be a number greater than 0'
            }
            if (!details || details.length < 25) {
                errors.details = 'Details is required and must be greater than 25 characters'
            }
            if (details?.length >= 900) {
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
            } else {
                const instrumentUpdated = await dispatch(updateInstrumentThunk(newInstrument, instrumentId))
                if (instrumentUpdated) {
                    nav(`/instruments/${instrumentUpdated.id}`)
                }
            }
        }
    }


    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <h3>Tell us about your gear!</h3>
            <div id='form-fields-container'>

                <label className="form-label-container">
                    Make: <br></br>
                    <input
                        type='text'
                        name='make'
                        value={make}
                        placeholder="Make"
                        onChange={e => setMake(e.target.value)}
                    ></input>
                </label>
                {validations.make && (<p className="validation-error-text">* {validations.make}</p>)}

                <label className="form-label-container">
                    Model: <br></br>
                    <input
                        type='text'
                        name='model'
                        value={model}
                        placeholder="Model"
                        onChange={e => setModel(e.target.value)}
                    ></input>
                </label>
                {validations.model && (<p className="validation-error-text">* {validations.model}</p>)}

                <label className="form-label-container">
                    Color: <br></br>
                    <input
                        type='text'
                        name='color'
                        value={color}
                        placeholder="Color"
                        onChange={e => setColor(e.target.value)}
                    ></input>
                </label>
                {validations.color && (<p className="validation-error-text">* {validations.color}</p>)}

                <label className="form-label-container">
                    Category: <br></br>
                    <select
                        className="inst-form-select-filed"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value='' disabled hidden>Please select a category</option>
                        <option value='Electric Guitar'>Electric Guitar</option>
                        <option value='Acoustic Guitar'>Acoustic Guitar</option>
                        <option value='Bass'>Bass</option>
                    </select>
                </label>
                {validations.category && (<p className="validation-error-text">* {validations.category}</p>)}

                <label className="form-label-container">
                    Price: <br></br>
                    <input
                        type='text'
                        name='price'
                        value={price}
                        placeholder="Color"
                        onChange={e => setPrice(e.target.value)}
                    ></input>
                </label>
                {validations.color && (<p className="validation-error-text">* {validations.price}</p>)}

                <label className="form-label-container">
                    Details about your gear: <br></br>
                    <textarea
                        type='text'
                        name='details'
                        value={details}
                        placeholder="Details"
                        onChange={e => setDetails(e.target.value)}
                    ></textarea>
                </label>
                {validations.details && (<p className="validation-error-text">* {validations.details}</p>)}

                <label className="form-label-container">
                    Body Material: <br></br>
                    <input
                        type='text'
                        name='body'
                        value={body}
                        placeholder="Body Material"
                        onChange={e => setBody(e.target.value)}
                    ></input>
                </label>
                {validations.body && (<p className="validation-error-text">* {validations.body}</p>)}

                <label className="form-label-container">
                    Fretboard Material: <br></br>
                    <input
                        type='text'
                        name='fretboard'
                        value={fretboard}
                        placeholder="Body Material"
                        onChange={e => setFretboard(e.target.value)}
                    ></input>
                </label>
                {validations.fretboard && (<p className="validation-error-text">* {validations.fretboard}</p>)}

                <label className="form-label-container">
                    Pre-owned:
                    <input
                        type='radio'
                        name='is_used'
                        value={true}
                        checked={is_used == 'true'}
                        onChange={e => setIsUsed(e.target.value)}
                    />
                </label>
                <label className="form-label-container">
                    New:
                    <input
                        type='radio'
                        name='is_used'
                        value={false}
                        checked={is_used == 'false'}
                        onChange={e => setIsUsed(e.target.value)}
                    />
                </label>
                {validations.is_used && (<p className="validation-error-text">* {validations.is_used}</p>)}

                <label className="form-label-container">
                    Image URL: <br></br>
                    <input
                        type='text'
                        name='image_url'
                        value={image_url}
                        placeholder="URL"
                        onChange={e => setImageUrl(e.target.value)}
                    ></input>
                </label>
                {validations.image_url && (<p className="validation-error-text">* {validations.image_url}</p>)}

            </div>


            <button className="submit-form-button" type='submit' disabled={isValidated}>{buttonName}</button>
        </form>
    );
}

