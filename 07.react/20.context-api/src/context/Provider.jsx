import React, { useState } from 'react'
import { store } from "./store"

const Provider = ({ children }) => {
    const initialState = {
        counter: 0,
        user: null,
        isLogin: false,
        isDarkTheme: true,
    }

    const [states, set_states] = useState(initialState)

    const increment = () => {
        set_states({
            ...states,
            counter: states.counter + 1
        })
    }

    const decrement = () => {
        set_states({
            ...states,
            counter: states.counter - 1
        })
    }

    const toggleTheme = () => {
        set_states({
            ...states,
            isDarkTheme: !states.isDarkTheme
        })
    }

    return (
        <store.Provider
            value={{
                states,
                increment,
                decrement,
                toggleTheme
            }}
        >
            {children}
        </store.Provider>
    )
}

export default Provider