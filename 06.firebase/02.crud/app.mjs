import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDU0CQ8vxduQlr1qZOH1dWjp3XfYE0IJuc",
    authDomain: "smit-b18.firebaseapp.com",
    projectId: "smit-b18",
    storageBucket: "smit-b18.firebasestorage.app",
    messagingSenderId: "243844172855",
    appId: "1:243844172855:web:49192254a79ffc193ec3b2",
    measurementId: "G-JCL8ZL1GN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// create
const create_post = async (e) => {
    e.preventDefault()
    const title = document.querySelector("#title").value
    const description = document.querySelector("#description").value

    try {

        const docRef = await addDoc(collection(db, "posts"), {
            title: title,
            description: description,
            cretedOn: new Date().getTime()
        });
        e.target.reset()
        get_data()

    } catch (error) {
        console.error(error)
    }

}

document.querySelector("form").addEventListener('submit', create_post)


// get
const get_data = async () => {
    const result = document.querySelector(".result")
    result.innerHTML = ""

    try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            const singlePost = doc.data()
            result.innerHTML += `
            <div class="post">
                <span>id: ${doc.id}</span>
                <h2>${singlePost.title}</h2>
                <p>${singlePost.description}</p>
                <b>${moment(singlePost.cretedOn).format('MMMM Do YYYY, h:mm:ss a')}</b>
                <div>
                    <button>Delete</button>
                    <button>Edit</button>
                </div>
            </div>
            `
        });

    } catch (error) {
        console.error(error)
    }
}

get_data()
