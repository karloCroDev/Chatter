import React, { useContext, useState } from "react"
import AuthStyle from "../styles/authentication.module.css"
import { Link } from "react-router-dom"
import photo from "../assets/photo.png"
import { UserContext } from "./FirebaseManagment.jsx"

export const SignUpPage = () => {
  //Firebase managment
  const { signUp } = useContext(UserContext)

  //form functionality
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassowrd] = useState("")
  // const [imageUpload, setImageUpload] = useState("")
  console.log(username)
  return (
    <>
      <form
        className={AuthStyle.container}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <ul
          className={`${AuthStyle.contentContainer} ${AuthStyle.contentContainerTwo}`}
        >
          <li>
            <div className={AuthStyle.title2}>Welcome to the Chatter!</div>
            <p>
              Private messaging app where you can send only one unique message
              less than 50 chrachters!
            </p>
          </li>
          <li>
            <label htmlFor="input">
              <span>Username:</span>
            </label>
            <input
              type="text"
              id="input"
              placeholder="Enter your email..."
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
            />
          </li>
          <li>
            <label htmlFor="email">
              <span>Email:</span>
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </li>
          <li>
            <label htmlFor="input2">
              <span>Password:</span>
            </label>
            <input
              type="password"
              id="input2"
              placeholder="Enter your password..."
              onChange={(e) => setPassowrd(e.target.value)}
              required
            />
          </li>
          <li className={AuthStyle.flex}>
            {/* <label htmlFor="image">Insert your avatar image:</label>
            <label htmlFor="image">
              <img src={photo} alt="" className={AuthStyle.image} />
            </label>
            <input
              type="file"
              id="image"
              required
              className={AuthStyle.avatarInput}
              onChange={(e) => setImageUpload(e.target.files[0])}
            /> */}
          </li>
          <li>
            <button
              onClick={() => {
                signUp(username, email, password)
              }}
            >
              Sign up!
            </button>
          </li>
          <li>
            <p>
              Don't have an account?{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                <span>Sign in</span>
              </Link>
            </p>
          </li>
        </ul>
      </form>
    </>
  )
}
