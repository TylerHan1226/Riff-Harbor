import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createInstrumentThunk, updateInstrumentThunk } from "../../redux/instrument";
import "./InstrumentForm.css";

export default function InstrumentForm({ buttonName, instrument }) {

    const dispatch = useDispatch()
    const nav = useNavigate()

    const user = useSelector(state => state.session.user)
    const { instrumentId } = useParams()

    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [details, setDetails] = useState('')
    const [body, setBody] = useState('')
    const [fretboard, setFretboard] = useState('')
    const [is_used, setIsUsed] = useState('')
    const [image_url, setImageUrl] = useState(null)

    const [validations, setValidations] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (instrument) {
            console.log('instrument.image_url in form ==>', instrument.image_url)
            setMake(instrument.make || '')
            setModel(instrument.model || '')
            setColor(instrument.color || '')
            setCategory(instrument.category || '')
            setPrice(instrument.price || '')
            setDetails(instrument.details || '')
            setBody(instrument.body || '')
            setFretboard(instrument.fretboard || '')
            setIsUsed(instrument.is_used || '')
            setImageUrl(instrument.image_url || '')
        }
    }, [instrument, instrumentId, image_url]);


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
            if (!price || price <= 0) {
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
            if (![true, false].includes(is_used)) {
                errors.is_used = 'New/Pre-owned field is required'
            }
            // if (!image_url) {
            //     errors.image_url = 'Image is required'
            // }
        }

        setValidations(errors)
        if (Object.keys(validations).length) {
            isValidated = true
        } else {
            isValidated = false
        }
    }, [submitted, make, model, color, category, price, details, body, fretboard, is_used, image_url])
    //DO NOT PUT VALIDATIONS IN THE DEPENDENCY

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        
        if (Object.keys(validations).length > 0) {
            return
        }
        // ---- the one I used for create and it works ----
        let formData
        if (image_url) {
            formData = {
                make, model, color, category, price, details, body, fretboard, is_used, image_url
            }
        } else {
            formData = {
                make, model, color, category, price, details, body, fretboard, is_used, image_url: instrument.image_url
            }
        }
        console.log('category ==>', category)
        console.log('details ==>', details)
        console.log('price ==>', price)
        // ---- not passing in price, category, details?? ---
        // const formData = new FormData()
        // formData.append('make', make)
        // formData.append('model', model)
        // formData.append('color', color)
        // formData.append('category', category)
        // formData.append('price', price)
        // formData.append('details', details)
        // formData.append('body', body)
        // formData.append('fretboard', fretboard)
        // formData.append('is_used', is_used)
        // formData.append('image_url', image_url)


        if (!instrumentId) {
            const instrumentCreated = await dispatch(createInstrumentThunk(formData))
            if (instrumentCreated?.id) {
                nav(`/instruments/${instrumentCreated.id}`)
            }
        } else {
            const instrumentUpdated = await dispatch(updateInstrumentThunk(formData, instrumentId))
            if (instrumentUpdated.id) {
                nav(`/instruments/${instrumentUpdated.id}`)
            }
        }
    }

    useEffect(() => {
        return () => {
            if (url) {
                URL.revokeObjectURL(url)
            }
        }
    }, [])

    let url = ''
    if (image_url) {
        console.log('image_url ==>', image_url)
        url = URL.createObjectURL(image_url)
        console.log('url ==>', url)
    }


    return (
        <form className='form-container'
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <div className='form-fields-container'>
                <h3>Tell us about your gear!</h3>
                <label className="form-label-container">
                    Make: <br></br>
                    <input
                        type='text'
                        name='make'
                        value={make}
                        placeholder="Make"
                        onChange={e => setMake(e.target.value)}
                        className="form-input-field"
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
                        className="form-input-field"
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
                        className="form-input-field"
                    ></input>
                </label>
                {validations.color && (<p className="validation-error-text">* {validations.color}</p>)}

                <label className="form-label-container">
                    Category: <br></br>
                    <select
                        className="inst-form-select-filed form-input-field"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value='' disabled selected hidden>Please select a category</option>
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
                        placeholder="Price"
                        onChange={e => setPrice(e.target.value)}
                        className="form-input-field"
                    ></input>
                </label>
                {validations.price && (<p className="validation-error-text">* {validations.price}</p>)}

                <label className="form-label-container">
                    Details about your gear: <br></br>
                    <textarea
                        type='text'
                        name='details'
                        value={details}
                        placeholder="Details"
                        onChange={e => setDetails(e.target.value)}
                        className="form-input-field form-textarea-field"
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
                        className="form-input-field"
                    ></input>
                </label>
                {validations.body && (<p className="validation-error-text">* {validations.body}</p>)}

                <label className="form-label-container">
                    Fretboard Material: <br></br>
                    <input
                        type='text'
                        name='fretboard'
                        value={fretboard}
                        placeholder="Fretboard Material"
                        onChange={e => setFretboard(e.target.value)}
                        className="form-input-field"
                    ></input>
                </label>
                {validations.fretboard && (<p className="validation-error-text">* {validations.fretboard}</p>)}

                <label className="form-label-container">
                    Pre-owned:
                    <input
                        type='radio'
                        name='is_used'
                        value={true}
                        checked={is_used === true}
                        onChange={() => setIsUsed(true)}
                    />
                </label>
                <label className="form-label-container">
                    New:
                    <input
                        type='radio'
                        name='is_used'
                        value={false}
                        checked={is_used === false}
                        onChange={() => setIsUsed(false)}
                    />
                </label>
                {validations.is_used && (<p className="validation-error-text">* {validations.is_used}</p>)}

                <label>Instrument Image Url:
                <input 
                    type='file'
                    accept='image/*'
                    onChange = {e => setImageUrl(e.target.files[0])}
                />
                {/* {validations.image_url && (<p className="validation-error-text">* {validations.image_url}</p>)} */}
                </label>

                <button className="submit-form-button" type='submit' disabled={isValidated}>
                    <p className='add-to-cart-text-dtl submit-form-btn-text'>{buttonName}</p>
                </button>

            </div>

            <div className="form-fields-container form-preview-img-container ">
                <h4>Post Your Photo!</h4>
                {image_url && instrument ? (
                    <img
                    id='instrument-preview-image'
                     className="form-preview-img" 
                      src={image_url} />
                )
                    : (
                        <img
                        id='instrument-preview-image'
                         className="form-preview-img" 
                          src={url} />
                    )
                }
            </div>


        </form>
    );
}

