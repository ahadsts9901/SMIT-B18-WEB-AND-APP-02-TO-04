import { create } from "zustand"

export const store = create((update) => {
    return {
        counter: 0,
        isDarkTheme: false,
        user: null,
        isLogin: false,

        increment: () => {
            update((state) => ({
                counter: state.counter + 1,
            }))
        },

        decrement: () => {
            update((state) => ({
                counter: state.counter - 1,
            }))
        },

        toggleTheme: () => {
            update((state) => ({
                isDarkTheme: !state.isDarkTheme,
            }))
        },

    }
})
