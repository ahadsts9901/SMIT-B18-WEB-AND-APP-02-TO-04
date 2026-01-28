document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    if (!email) {
        alert("please enter your email")
        return
    }

    if (!email.includes("@")) {
        alert("email is invalid")
        return
    }

    if (!password) {
        alert("please enter your password")
        return
    }

    console.log("login form submitted")

})