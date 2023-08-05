import React, { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "./FirebaseManagment"
import chatStyle from "../styles/chat.module.css"
import sendMessage from "../assets/send.png"

export const Chat = () => {
  const {
    user,
    image,
    signOutFunc,
    getUsers,
    messageFunc,
    getReciever,
    getMessages,
  } = useContext(UserContext)
  const [displayBackroundColor, setDisplayBackgroundColor] = useState(null)
  const [getUserDoc, setGetUserDoc] = useState("")
  const [displayContainer, setDisplayContainer] = useState(false)
  const inputValue = useRef()

  const getUser = (index, id) => {
    setDisplayBackgroundColor(index)
  }

  return (
    <>
      <img src={image ? image : null} alt="" />
      <div className={chatStyle.container}>
        <aside>
          {/* <ul>
            <li>
              <div className={chatStyle.imgDiv}></div>
            </li>
            <li>
              <span>{user[0].toUpperCase() + user.slice(1)}</span>
              {/* this should not be user  */}
          {/* </li>
          </ul> */}
          {getUsers
            ? getUsers.map((usersData, i) => {
                return (
                  <>
                    <article
                      key={i}
                      onClick={() => {
                        getUser(i, usersData.id)
                        setGetUserDoc(
                          usersData.usernameDoc[0].toUpperCase() +
                            usersData.usernameDoc.slice(1)
                        )
                        setDisplayContainer(true)
                        getReciever(usersData.usernameDoc)
                      }}
                      className={
                        displayBackroundColor === i
                          ? chatStyle.bgColor
                          : chatStyle.standardBg
                      }
                    >
                      <div className={chatStyle.imgDiv}></div>
                      {/* Put image instead of the the divs this is for demo only */}
                      <span>
                        {usersData.usernameDoc[0].toUpperCase() +
                          usersData.usernameDoc.slice(1)}
                      </span>
                    </article>
                  </>
                )
              })
            : null}
        </aside>
        <main>
          <ul>
            <li>
              <div className={chatStyle.imgDiv}></div>
              {/* change image as soon as possible  */}
            </li>
            <li>
              <span>
                {displayContainer ? getUserDoc : "Please select user to chat "}
              </span>
              {/* this should not be user  */}
            </li>
          </ul>
          <div className={chatStyle.chattingContainer}>
            <ul>
              {getMessages
                ? getMessages[0].content.map((x) => (
                    <li
                      className={
                        x.sender === user
                          ? chatStyle.leftMessage
                          : chatStyle.rightMessage
                      }
                    >
                      {x.message}
                    </li>
                  ))
                : null}
            </ul>
            <div className={chatStyle.sendMessage}>
              <input
                type="text"
                placeholder="Enter your message..."
                ref={inputValue}
              />
              <button
                className={chatStyle.sendMessageFalse}
                onClick={() => messageFunc(inputValue.current.value)}
              >
                <img src={sendMessage} alt="send button" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
