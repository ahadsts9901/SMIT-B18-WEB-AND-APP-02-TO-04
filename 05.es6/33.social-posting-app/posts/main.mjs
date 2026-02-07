let editIndex = null
let currentUser_string = localStorage.getItem("currentUser")
let currentUser = JSON.parse(currentUser_string)
if (!currentUser) {
    window.location.href = "../login/index.html"
}else{
    document.querySelector(".user-email").innerText = currentUser.email
}

function logout() {
    localStorage.removeItem("currentUser")
    window.location.href = "../login/index.html"
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const title = document.querySelector("#title").value
    const description = document.querySelector("#desc").value

    let all_post_string = localStorage.getItem("posts")
    let all_posts = JSON.parse(all_post_string) || []

    if (editIndex !== null) {
        all_posts[editIndex].title = title
        all_posts[editIndex].description = description
        localStorage.setItem("posts", JSON.stringify(all_posts))
        editIndex = null
        alert("post updated")
    } else {
        let new_post = {
            title: title,
            description: description,
            time: new Date().getTime(),
            createdBy: currentUser.email,
        }

        all_posts.unshift(new_post)
        localStorage.setItem("posts", JSON.stringify(all_posts))
        alert("post created")
    }

    e.target.reset()
    render_posts()

})

function like_post(postIndex) {
    console.log("like_post", postIndex)
}

function edit_post(postIndex) {
    let all_posts = JSON.parse(localStorage.getItem("posts")) || []
    let post = all_posts[postIndex]

    if (post.createdBy !== currentUser.email) {
        alert("You can only edit your own post")
        return
    }

    document.querySelector("#title").value = post.title
    document.querySelector("#desc").value = post.description

    editIndex = postIndex
}

function delete_post(postIndex) {
    let all_posts_string = localStorage.getItem("posts")
    let all_posts = JSON.parse(all_posts_string) || []

    all_posts.splice(postIndex, 1)

    localStorage.setItem("posts", JSON.stringify(all_posts))
    render_posts()
}

function render_posts() {
    const all_posts_string = localStorage.getItem("posts")
    const all_posts = JSON.parse(all_posts_string) || []

    const output = document.querySelector(".output")
    output.innerHTML = ""

    all_posts.forEach((post, index) => {
        output.innerHTML += `
        <div class="single-post">
                <h2>${post.title}</h2>
                <h4>${post.createdBy}</h4>
                <p>${post.description}</p>
                <h3>${moment(post.time).fromNow()}</h3>
                <div class="post-btns">
                    ${post.createdBy === currentUser.email ?
                        `<button onclick="like_post('${index}')"> <i class="bi bi-hand-thumbs-up"></i> Like</button>
                        <button onclick="edit_post('${index}')"> <i class="bi bi-pencil"></i> Edit</button>
                        <button onclick="delete_post('${index}')"> <i class="bi bi-trash3"></i> Delete</button>`
                        :
                        `
                        <button onclick="like_post('${index}')"> <i class="bi bi-hand-thumbs-up"></i> Like</button>
                        `
                    }
                </div>
        </div>
        `

    });

}

render_posts()

// let age = 34
// console.log(`your age is ${(age > 24) ? "above" : "below" }`)
