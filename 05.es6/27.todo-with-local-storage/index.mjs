function get_todos() {

    // getting string wala array from local storage
    let string_wala_array_from_local_storage = localStorage.getItem("todos")

    // convert string to array
    let all_todos = JSON.parse(string_wala_array_from_local_storage) || []

    let output = document.querySelector(".output")
    output.innerHTML = ""

    for (let i = 0; i < all_todos.length; i++) {
        output.innerHTML += `
        <div>
            <span>${all_todos[i]}</span>
            <button>Edit</button>
            <button>Delete</button>
        </div>
        `
    }

}

function create_todo(u) {

    // dont refresh page
    u.preventDefault();

    // get user input from html
    let userInput = document.querySelector("#userInput");

    // getting string wala array from local storage
    let string_wala_array_from_local_storage = localStorage.getItem("todos")

    // converting string wala array to normal array
    let oldValues = JSON.parse(string_wala_array_from_local_storage) || [];

    // adding new value at the start
    // keeping old values
    let newValues = [userInput.value, ...oldValues];

    // convert new_array to string
    let string_main_converted_array = JSON.stringify(newValues)

    // save converted string to local storage
    localStorage.setItem("todos", string_main_converted_array)

    userInput.value = "";
    get_todos()
}


get_todos()