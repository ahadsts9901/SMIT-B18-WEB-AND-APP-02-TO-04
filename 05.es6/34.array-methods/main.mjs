let my_array = ["pakistan", "china", "japan", "uae", "canada", "srilanka", "switzerland"]

// array.map()

// old
// let new_array = []

// for (let i = 0; i < my_array.length; i++) {
//     new_array.push(my_array[i].toUpperCase())
// }

// console.log(new_array)


// new

// let capitalize_array = my_array.map((country) => {
//     return country.toUpperCase()
// })

// console.log(capitalize_array)
// console.log(my_array)

// let numbers = [1, 2, 3, 4, 5, 6]

// let double_numbers = numbers.map((num) => {
//     return num * 2
// })

// console.log(double_numbers)

// console.log(capitalize_array)



// array.forEach()
// let countries_array = ["pakistan", "china", "uae", "canada", "srilanka"]

// countries_array.forEach((country) => {
//     return country.toUpperCase()
// })

// console.log(countries_array)



// array.filter()

// let numbers = [3, 5, 7, 9, 2, 4]

// let filtered_numbers = numbers.filter((num) => {
//     return num > 3
// })

// console.log(numbers)
// console.log(filtered_numbers)


// array.find()

// let users = ["ali", "irfan", "umar", "fahad", "umair"]

// let user_data = users.find((user) => {
//     return user === "umar"
// })

// console.log(user_data)



let users = [
    {
        name: "Mansoor",
        age: 22,
        favSubject: "computer",
        email: "mansoor@gmail.com"
    },
    {
        name: "Ahmad Raza",
        age: 22,
        favSubject: "chemistry",
        email: "ahmad@gmail.com"
    },
    {
        name: "Sufiyan",
        age: 18,
        favSubject: "Sindhi",
        email: "sufiyan@gmail.com"
    },
    {
        name: "Talha",
        age: 19,
        favSubject: "Pakistan Studies",
        email: "sufiyan@gmail.com"
    },
    {
        name: "Bilawal",
        age: 19,
        favSubject: "Urdu",
        email: "bilawal@gmail.com"
    },
    {
        name: "Faris",
        age: 18,
        favSubject: "Islamiat",
        email: "faris@gmail.com"
    },
    {
        name: "Madni",
        age: 22,
        favSubject: "Math",
        email: "madni@gmail.com"
    }
]


// array.map()

// let capital_subjects = users.map((user) => {
//     return {
//         ...user,
//         favSubject: user.favSubject.toUpperCase()
//     }
// })

// console.log(capital_subjects)


// let older_than_22 = users.filter((user) => {
//     return user.age == 22
// })

// console.log(older_than_22)


let user_with_email = users.find((user) => {
    return user.email == "sufiyan@gmail.com"
})

console.log(user_with_email)
