document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const confirm_password = document.querySelector('#confirm_password').value

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

    if (password !== confirm_password) {
        alert("password do not match")
        return
    }

    console.log("signup form submitted")

})