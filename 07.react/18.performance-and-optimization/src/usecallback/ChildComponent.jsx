import React, { memo } from 'react'

const ChildComponent = memo(({ handleClick }) => {
    console.log("child is rendered")
    return (
        <div>
            ChildComponent
            <button onClick={handleClick}>click me</button>
        </div>
    )
})

export default ChildComponent