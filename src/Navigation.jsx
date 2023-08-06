import { useContext, useState } from "react"
import { Routes, Route } from "react-router-dom"
import {
  SignInPage,
  SignUpPage,
  Chat,
  UserContext,
  Protected,
} from "./components/Exports"
import NavigationStyle from "./styles/navigation.module.css"
import Icon from "./assets/chatting.png"
import chatStyle from "./styles/chat.module.css"
import signOutIcon from "./assets/signOut.png"

export function Navigation() {
  const { user, signOutFunc } = useContext(UserContext)

  return (
    <>
      <nav>
        <ul className={NavigationStyle.ul}>
          <li className={NavigationStyle.li}>
            <h1 className={NavigationStyle.title}>Chatter</h1>
          </li>
          <li className={NavigationStyle.li}>
            <img src={Icon} alt="logo" className={NavigationStyle.img} />
          </li>
          {user ? (
            <div style={{ marginRight: "100px" }}>
              <li>
                <div className={chatStyle.imgDivGreen}></div>
              </li>
              <li>
                <span>
                  {user ? user[0].toUpperCase() + user.slice(1) : null}
                </span>
              </li>
              <li>
                <img
                  src={signOutIcon}
                  alt="sign out icon"
                  onClick={signOutFunc}
                />
              </li>
            </div>
          ) : null}
        </ul>
      </nav>

      <Routes>
        <Route
          path="/chat"
          element={
            <Protected>
              <Chat />
            </Protected>
          }
        ></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
        <Route path="/" element={<SignInPage />}></Route>
      </Routes>

      {/* <a target="_blank" href="https://icons8.com/icon/85491/chat">Chat</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> 
      Not this <a target="_blank" href="https://icons8.com/icon/11816/add-image">add photo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      <a target="_blank" href="https://icons8.com/icon/54234/add-image">add photo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a><a target="_blank" href="https://icons8.com/icon/VTOU0AOwSnkY/logout">sign out</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      <a target="_blank" href="https://icons8.com/icon/60700/sent">Sent</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      <a target="_blank" href="https://icons8.com/icon/60700/sent">Sent</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      <a target="_blank" href="https://icons8.com/icon/132/search">Search</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>*/}
    </>
  )
}
