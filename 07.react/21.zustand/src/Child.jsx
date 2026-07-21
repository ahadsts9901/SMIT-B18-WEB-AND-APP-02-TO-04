import React from 'react'
import { store } from './store/states'

const Child = () => {
    const { counter, increment, decrement, isDarkTheme, toggleTheme } = store()

    return (
        <div>
            <button onClick={toggleTheme}>{isDarkTheme ? "Dark" : "Light"}</button>

            <button onClick={decrement}>-</button>
            <p>{counter}</p>
            <button onClick={increment}>+</button>
        </div>
    )
}

export default Child