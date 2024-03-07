import React, { useContext, useEffect, useState } from "react"
import AuthStyle from "../styles/authentication.module.css"
import { Link } from "react-router-dom"
import photo from "../assets/photo.png"
import { UserContext } from "./FirebaseManagment.jsx"
import { ImageContx } from "./ImageUpload.jsx"

export const SignUpPage = () => {
  //Firebase managment
  const { signUp, userUid, user } = useContext(UserContext)
  const { uploadImageFunc, setImage } = useContext(ImageContx)
  //form functionality
  // console.log(userUid)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassowrd] = useState("")
  const [imageUpload, setImageUpload] = useState("")
  console.log(userUid)
  return (
    <>
      <form
        className={AuthStyle.container}
        onSubmit={async (e) => {
          e.preventDefault()
          await signUp(username, email, password)
          console.log(userUid)
          await uploadImageFunc(imageUpload, userUid)
          await setImage(userUid, user)
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
          <li className={AuthStyle.specialContainer}>
            <label htmlFor="image">
              Insert your avatar image:
              <img src={photo} alt="" className={AuthStyle.image} />
            </label>

            <input
              type="file"
              id="image"
              required
              className={AuthStyle.avatarInput}
              onChange={(e) => {
                const file = e.target.files[0]
                setImageUpload(file)
              }}
            />
          </li>
          <li>
            <button>Sign up!</button>
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
