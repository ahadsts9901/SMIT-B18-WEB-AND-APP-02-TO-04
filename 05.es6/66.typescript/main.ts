let num2 = 23
num2 = 56
// num2 = "hello"

// let name = "jumbo"
let username = "jumbo"
username = "12"

let isMale = true
isMale = false
// isMale = "false"


const greetUser = (username: String) => {
    alert("hello " + username)
}

greetUser("first user")

let age: Number = 34
let myName: String = "uncle john"
let isHuman: Boolean = true
let languages: String[] = ["html", "css", "js", "ts"]
let numbers: Number[] = [1, 2, 34, 5]

let multipleData: (String | Number | Boolean)[] = [1, 2, 3, "hello", "bye", true]
// let multipleData: any[] = [1, 2, 3, "hello", "bye", true]


interface User {
    username: String
    age: Number
    isPresent: Boolean
    languages: String[]
}

let user: User = {
    username: "",
    age: 12,
    isPresent: true,
    languages: ["html"]
}

let user2:any = {
    firstname: "user first name",
    lastname: "user last name",
}

user2 = {
    age: 12,
}
