import "./index.css"
import React, { useContext } from 'react'
import { store } from './context/store'

const App = () => {
  const { states, increment, decrement, toggleTheme } = useContext(store)

  return (
    <div className={`${states.isDarkTheme ? "dark" : "light"}`}>
      <button onClick={toggleTheme}>
        {states.isDarkTheme ? "Light" : "Dark"}
      </button>

      <button onClick={decrement}>-</button>
      <p>{states.counter}</p>
      <button onClick={increment}>+</button>
    </div>
  )
}

export default App