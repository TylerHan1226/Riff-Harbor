
// import ProfileButton from "./ProfileButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Filter({ instruments, filterInst, setFilterOn, isFilterSwitch, filtersOn }) {
    
    // brand filter
    const [brand, setBrand] = useState('')
    const handleBrandChange = (e) => {
            setBrand(e)
            setFilterOn(!isFilterSwitch)
            filtersOn = true
    }
    if (brand !== '') instruments = instruments.filter(ele => ele.make == brand)

    // condition filter
    const [isUsed, setIsUsed] = useState(null)
    const handleCondition = (e) => {
        if ((isUsed == true && e == true) || (isUsed == false && e == false)) {
            setIsUsed(null)
        } else {
            setIsUsed(e)
        }
        setFilterOn(!isFilterSwitch)
        filtersOn = true
    }
    if (isUsed == true) instruments = instruments.filter(ele => ele.is_used == true)
    if (isUsed == false) instruments = instruments.filter(ele => ele.is_used == false)
    // price filter
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const handleMinPriceChange = (e) => {
        const newValue = parseFloat(e.target.value)
        newValue ? setMinPrice(newValue) : setMinPrice('')
        setFilterOn(!isFilterSwitch)
        filtersOn = true
    }
    const handleMaxPriceChange = (e) => {
        const newValue = parseFloat(e.target.value)
        newValue ? setMaxPrice(newValue) : setMaxPrice('')
        setFilterOn(!isFilterSwitch)
        filtersOn = true
    }
    if (minPrice) instruments = instruments.filter(ele => ele.price > minPrice)
    if (maxPrice) instruments = instruments.filter(ele => ele.price < maxPrice)

    useEffect(() => {
        filterInst(instruments)
    }, [brand, isUsed, minPrice, maxPrice, isFilterSwitch])

    return (
        <section className="category-filter-container">

            <div className="filter-containers">
                <h2>Brand</h2>
                <div className="brand-filter-container">
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='' onChange={() => handleBrandChange('')} defaultChecked></input>
                        <label className="brand-filter-labels">All</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='B.C. Rich' onChange={() => handleBrandChange('B.C. Rich')}></input>
                        <label className="brand-filter-labels">B.C. Rich</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='Martin' onChange={() => handleBrandChange('Ernie Ball')}></input>
                        <label className="brand-filter-labels">Ernie Ball</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='ESP' onChange={() => handleBrandChange('ESP')}></input>
                        <label className="brand-filter-labels">ESP</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='Fender' onChange={() => handleBrandChange('Fender')}></input>
                        <label className="brand-filter-labels">Fender</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='Gibson' onChange={() => handleBrandChange('Gibson')}></input>
                        <label className="brand-filter-labels">Gibson</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='Jackson' onChange={() => handleBrandChange('Jackson')}></input>
                        <label className="brand-filter-labels">Jackson</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='Martin' onChange={() => handleBrandChange('Martin')}></input>
                        <label className="brand-filter-labels">Martin</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='PRS' onChange={() => handleBrandChange('PRS')}></input>
                        <label className="brand-filter-labels">PRS</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='Schecter' onChange={() => handleBrandChange('Schecter')}></input>
                        <label className="brand-filter-labels">Schecter</label>
                    </div>
                    <div className="brand-filters">
                        <input className="radio-dot" type='radio' name='brands' value='Taylor' onChange={() => setBrand('Taylor')}></input>
                        <label className="brand-filter-labels">Taylor</label>
                    </div>
                </div>
            </div>

            <div className="filter-containers">
                <h2>Price</h2>
                <div className="filter-price-input-container">
                    <label className="filter-price-labels">
                        <input className="filter-price-text-bar" type="text" placeholder="$ Min" value={minPrice} onChange={handleMinPriceChange} />
                    </label>
                    <label>-</label>
                    <label className="filter-price-labels">
                        <input className="filter-price-text-bar" type="text" placeholder="$ Max" value={maxPrice} onChange={handleMaxPriceChange} />
                    </label>
                </div>
            </div>

            <div className="filter-containers">
                <h2>Condition</h2>
                <div className="filter-condition-input-container">
                    <button className={`filter-condition-btn ${isUsed == false ? 'selected' : ''}`} onClick={() => handleCondition(false)}>
                        New
                    </button>
                    <button className={`filter-condition-btn ${isUsed == true ? 'selected' : ''}`} onClick={() => handleCondition(true)}>
                        Pre-owned
                    </button>
                </div>
            </div>
        </section>
    )
}
