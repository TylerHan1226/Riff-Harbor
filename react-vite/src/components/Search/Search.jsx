import "./Search.css"
import { useSelector } from "react-redux";

export default function Search() {

    const user = useSelector(state => state.session.user)

    const handleSearch = async (e) => {
        e.preventDefault()
    }

    return (
        <section id="search-modal-container">
            <form className="search-form"
                onSubmit={handleSearch}>
                <div className="search-form-fields">
                    <input
                        type="text"
                        placeholder="Find your instrument"
                    >
                    </input>
                    <button className="search-modal-btn" type="submit">
                        <p className="search-modal-btn-text">Search</p>
                    </button>
                </div>
            </form>
        </section>
    );
}
