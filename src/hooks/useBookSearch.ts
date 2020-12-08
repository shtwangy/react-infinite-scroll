import { useEffect, useState } from 'react'
import axios from 'axios'
import {Book} from '../types/Book'

interface OpenLibraryResponse {
    data: {
        docs: {
            key: string
            title: string
        }[]
    }
}

const useBookSearch = (query: string, pageNumber: number) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([] as Book[])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setBooks([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel: any
        axios({
            method: 'GET',
            url: 'http://openlibrary.org/search.json',
            params: { q: query, page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then((res: OpenLibraryResponse) => {
            console.log(res)
            setBooks(prevBooks => {
                return [...prevBooks, ...res.data.docs.map(b => {
                    return {
                        key: b.key,
                        title: b.title
                    }
                })]
            })
            setHasMore(res.data.docs.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber])

    return { loading, error, books, hasMore }
}

export default useBookSearch
