import React, { useEffect, useState } from 'react'

const Functional = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("hello world")
    }, [])

    return (
        <div>
            Functional
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    )
}

export default Functional