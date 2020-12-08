import React, {useState} from 'react';
import useBookSearch from "./hooks/useBookSearch";

function App() {
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1);
    const { loading, error, books, hasMore } = useBookSearch(query, pageNumber)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    return (
        <>
            <h1>Hello, Infinite Scroll Trial...</h1>
            <input type="text" onChange={handleSearch}></input>
            {
                books.length > 0 && (
                    books.map(book => (
                        <div key={book}>{book}</div>
                    ))
                )
            }
            <div>Loading...</div>
            <div>Error</div>
        </>
    );
}

export default App;
