import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { getAllNewsThunk } from "../../redux/news";

export default function News() {
    const nav = useNavigate()
    const { page } = useParams()

    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(parseInt(page) || 1)

    const data = useSelector(state => state.news)

    console.log('data =>', data)
    console.log('currentPage =>', currentPage)

    useEffect(() => {
        dispatch(getAllNewsThunk(currentPage))
    }, [dispatch, currentPage])

    return (
        <>
            <h1>News</h1>
            
            <div className="news-container">
                {/* {data?.map(ele => (
                    <div>
                        ele.author
                    </div>       
                ))} */}
            </div>
        </>
    )
}