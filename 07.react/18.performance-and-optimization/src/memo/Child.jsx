import React, { memo } from 'react'

const Child = memo(() => {
    console.log("child is rendering")
    return (
        <div>Child</div>
    )
})

export default Child