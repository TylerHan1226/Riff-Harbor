import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { getAllNewsThunk } from "../../redux/news";
import './News.css'

export default function News() {
    const nav = useNavigate()
    const { page } = useParams()

    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(parseInt(page) || 1)

    const news = useSelector(state => state.news)?.News

    console.log('news =>', news)

    useEffect(() => {
        dispatch(getAllNewsThunk(currentPage))
    }, [dispatch, currentPage])

    return (
        <>
            <h1>News</h1>
            
            <div className="news-container">
                {
                    news?.map(ele => (
                        <div className="news-tab" key={ele.url}>
                            <h2>{ele.title}</h2>

                        </div>
                    ))
                }
            </div>
        </>
    )
}