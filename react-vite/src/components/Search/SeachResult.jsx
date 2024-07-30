import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInstrumentsByModelThunk } from "../../redux/instrument";


export default function SearchResult() {
    const dispatch = useDispatch()
    const { instModel } = useParams()
    let instruments = useSelector(state => state.instruments?.SelectedInstruments)

    useEffect(() => {
        dispatch(getInstrumentsByModelThunk(instModel))
    }, [dispatch, instModel])

    console.log("instruments ==>", instruments)

    return (
        <div className="page-container">
            <h1>{instModel}</h1>
            <div>

            </div>
        </div>
    );
}
