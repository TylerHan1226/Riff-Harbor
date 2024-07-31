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
            <section>
                <h3>Trending Search</h3>
                <section className="search-trending-container">
                    <div className="search-trending-search-container">
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
                                onClick={() => handleTrendingBtn("Vintage")}>
                                Vintage
                            </button>
                            <button className="search-trending-btns"
                                onClick={() => handleTrendingBtn("Taylor")}>
                                Taylor
                            </button>
                            <button className="search-trending-btns"
                                onClick={() => handleTrendingBtn("Acoustic Guitar")}>
                                Acoustic Guitar
                            </button>
                            <button className="search-trending-btns"
                                onClick={() => handleTrendingBtn("Black Satin")}>
                                Black Satin
                            </button>
                        </div>
                    </div>
                    <div className="search-trending-products-container">

                    </div>

                </section>

            </section>
        </section>
    );
}
