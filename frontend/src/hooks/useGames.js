import { useState, useEffect, useMemo } from 'react'
import { getGames } from '../api/games'

export function useGames(filters = {}) {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)])

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        setError(null)
        getGames(memoizedFilters)
            .then((res) => setGames(res.data))
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            })
            .finally(() => setLoading(false))
        return () => controller.abort()
    }, [memoizedFilters])

    return { games, loading, error }
}