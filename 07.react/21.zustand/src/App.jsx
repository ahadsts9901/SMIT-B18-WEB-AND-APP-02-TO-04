import React from 'react'
import { store } from './store/states'
import Child from './Child'

const App = () => {
  const { counter, increment, decrement, isDarkTheme, toggleTheme } = store()

  return (
    <div>
      <button onClick={toggleTheme}>{isDarkTheme ? "Dark" : "Light"}</button>

      <button onClick={decrement}>-</button>
      <p>{counter}</p>
      <button onClick={increment}>+</button>

      <h1>child</h1>
      <Child />
    </div>
  )
}

export default App