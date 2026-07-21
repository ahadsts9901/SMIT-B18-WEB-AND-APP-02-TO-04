import React, { useMemo, useState } from 'react'

const UseMemoHook = () => {
  const [count, setCount] = useState(0)
  const [useAge, setUserage] = useState(24)

  const heavyCalculation = () => {
    console.log("calculation running")
    // CPU heavy calculation
    return "calculation done"
  }

  const heavyResult = useMemo(() => {
    return heavyCalculation()
  }, [useAge])

  // const heavyResult = heavyCalculation()

  console.log(heavyResult)

  return (
    <div>
      UseMemoHook
      <br />
      {useAge}
      <br />
      <button onClick={() => setUserage(useAge + 2)}>Add 2</button>
      <br />
      <button onClick={() => setCount(count - 1)}>-</button>
      <b>{count}</b>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

export default UseMemoHook