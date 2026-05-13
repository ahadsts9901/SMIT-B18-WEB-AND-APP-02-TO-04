import './App.css'
import myPicture from "./assets/my-image.avif"

function App() {
  console.log("hello")
  // alert("hello")

  return (
    <div>
      <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      <br />
      <img src={myPicture} alt="my image" />
      <br />
      welcome to my app hello world
      <br />
      <a target='_blank' href="https://saylanimit.com">click me</a>
      <br />
      <br />
      {12 + 8}
      <br />
      12 + 8 * 90
      <br />
    </div>
  )
}

export default App
