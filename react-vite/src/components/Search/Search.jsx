import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { useModal } from "../../context/Modal";

export default function Search() {
    const [instModel, setInstModel] = useState("");
    const navigate = useNavigate();
    const { closeModal } = useModal()

    const handleSearch = (e) => {
        e.preventDefault();
        if (instModel.length == 0) {
            navigate(`/`);
        } else {
            navigate(`/search/${instModel}`);
        }
        closeModal()
    };

    return (
        <section id="search-modal-container">
            <form className="search-form" onSubmit={handleSearch}>
                <div className="search-form-fields">
                    <input
                        type="text"
                        placeholder="Find your instrument"
                        value={instModel}
                        onChange={(e) => setInstModel(e.target.value)}
                    />
                    <button className="search-modal-btn" type="submit">
                        <p className="search-modal-btn-text">Search</p>
                    </button>
                </div>
            </form>
        </section>
    );
}
