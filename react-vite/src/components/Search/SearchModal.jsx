import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { useModal } from "../../context/Modal";

export default function Search() {
    const [searchInput, setSearchInput] = useState("");
    const nav = useNavigate();
    const { closeModal } = useModal()

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.length == 0) {
            nav(`/`);
        } else {
            nav(`/search/${searchInput}`);
        }
        closeModal()
    };

    const handleTrendingBtn = (trendingText) => {
        nav(`/search/${trendingText}`);
        closeModal()
    }

    return (
        <section id="search-modal-container">
            <form className="search-form" onSubmit={handleSearch}>
                <div className="search-form-fields">
                    <input
                        type="text"
                        placeholder="Find your instrument"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="search-modal-btn" type="submit">
                        <p className="search-modal-btn-text">Search</p>
                    </button>
                </div>
            </form>
            <div className="search-trending-container">
                <h3>Trending Search</h3>
                <div className="search-trending-searches">
                    <button className="search-trending-btns"
                    onClick={() => handleTrendingBtn("Fender")}>
                        Fender
                    </button>
                    <button className="search-trending-btns"
                    onClick={() => handleTrendingBtn("Les Paul")}>
                        Les Paul
                    </button>
                    <button className="search-trending-btns"
                    onClick={() => handleTrendingBtn("Black Satin")}>
                        Black Satin
                    </button>
                    <button className="search-trending-btns"
                    onClick={() => handleTrendingBtn("Acoustic Guitar")}>
                        Acoustic Guitar
                    </button>
                    <button className="search-trending-btns"
                    onClick={() => handleTrendingBtn("ESP")}>
                        Taylor 
                    </button>
                </div>
            </div>
        </section>
    );
}
