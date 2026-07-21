import React, { useState } from 'react'
import Child from './Child'

const Memo = () => {
  const [count, setCount] = useState(0)
  console.log("parent rendered")

  return (
    <div>
      <h3>Memo</h3>
      <button onClick={() => setCount(count - 1)}>-</button>
      <b>{count}</b>
      <button onClick={() => setCount(count + 1)}>+</button>

      <Child />
    </div>
  )
}

export default Memo