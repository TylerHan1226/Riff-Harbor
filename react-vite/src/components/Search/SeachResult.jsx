import { useParams } from "react-router-dom";


export default function SearchResult() {

    const { userInput } = useParams()

    return (
        <h1>{userInput}</h1>
    );
}
