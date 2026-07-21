import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, set_data] = useState([])
    const [loading, set_loading] = useState(false)
    const [error, set_error] = useState(null)

    const get_data = async () => {
        try {
            set_loading(true)
            const response = await fetch(url)
            const data = await response.json()
            set_loading(false)
            set_data(data)

        } catch (err) {
            console.error(err);
            set_error(err)
            set_loading(false)
        }
    }

    useEffect(() => {
        get_data()
    }, [])

    return {
        data, loading, error
    }
}

export default useFetch