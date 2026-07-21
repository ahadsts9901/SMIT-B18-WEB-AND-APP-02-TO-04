import React, { useCallback, useState } from 'react'
import Child from "./ChildComponent"

const UseCallBackhook = () => {
  console.log("parent rendered")

  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    console.log("click is running")
  }, [])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <h3>UseCallBackhook: {count}</h3>
      <Child handleClick={handleClick} />
    </div>
  )
}

export default UseCallBackhook