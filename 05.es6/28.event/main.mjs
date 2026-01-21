function submit_form(event) {
    event.preventDefault()
    console.log("submitting form")
    console.log(event)
}

function change_input(event) {
    console.log(event.target.value)
}

function input_text_change(event) {
    console.log(event.target.value)
}


function handle_mouse_over(event) {
    event.target.src = "https://cdn.thewirecutter.com/wp-content/media/2025/09/BEST-WOMENS-WHITE-T-SHIRTS-SUB-2048px-5847.jpg?auto=webp&quality=75&width=1024"
}

function handle_image_out(event) {
    event.target.src = "https://www.shutterstock.com/image-photo/soiled-dirty-muddy-white-t-600nw-2510520901.jpg"
}

function handle_mouse_move(event) {
    const image = document.querySelector(".thirsty-image");

    image.style.position = "fixed";
    image.style.left = event.clientX + 15 + "px";
    image.style.top = event.clientY + 15 + "px";
}
