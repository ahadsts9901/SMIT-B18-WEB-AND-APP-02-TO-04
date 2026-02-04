let currentUser_string = localStorage.getItem("currentUser")
let currentUser = JSON.parse(currentUser_string)
if(!currentUser){
    window.location.href = "../login/index.html"
}
document.querySelector(".user-email").innerText = currentUser.email

function logout() {
    localStorage.removeItem("currentUser")
    window.location.href = "../login/index.html"
}
