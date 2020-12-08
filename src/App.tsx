import React, {useState, useRef, useCallback} from 'react';
import useBookSearch from "./hooks/useBookSearch";

function App() {
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1);

    const { loading, error, books, hasMore } = useBookSearch(query, pageNumber)

    const observer = useRef<IntersectionObserver | null>(null);
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

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
                    books.map((book, index) => {
                        if (books.length === index + 1) {
                            return <div ref={lastBookElementRef} key={book}>{book}</div>
                        }
                        return <div key={book}>{book}</div>
                    })
                )
            }
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
        </>
    );
}

export default App;
