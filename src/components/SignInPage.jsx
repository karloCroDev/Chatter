import React, { useContext, useState } from "react"
import AuthStyle from "../styles/authentication.module.css"
import { Link } from "react-router-dom"
import { UserContext } from "./FirebaseManagment.jsx"

export const SignInPage = () => {
  //Firebase managment
  const { signIn, signOutFunc } = useContext(UserContext)
  //forms
  const [email, setEmail] = useState("")
  const [password, setPassowrd] = useState("")
  return (
    <>
      <form
        className={AuthStyle.container}
        onSubmit={(e) => {
          e.preventDefault()
          signIn(email, password)
        }}
      >
        <ul className={AuthStyle.contentContainer}>
          <li>
            <div className={AuthStyle.title}>Welcome back to the Chatter!</div>
            <p>
              Private messaging app where you can send only one unique message
              less than 50 chrachters!
            </p>
          </li>
          <li>
            <label htmlFor="input">
              <span>Email:</span>
            </label>
            <input
              type="text"
              id="input"
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
          <li className={AuthStyle.btn2}>
            <button>Log in!</button>
          </li>

          <li>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <span>Sign Up</span>
              </Link>
            </p>
          </li>
        </ul>
      </form>
    </>
  )
}
