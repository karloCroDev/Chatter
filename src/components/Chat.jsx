import React, { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "./FirebaseManagment"
import chatStyle from "../styles/chat.module.css"
import sendMessage from "../assets/send.png"
import searhIcon from "../assets/search.png"
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
  ///search section
  const searchValue = useRef()
  const [search, setSearch] = useState("")

  const getUser = (index, id) => {
    setDisplayBackgroundColor(index)
  }

  return (
    <>
      <img src={image ? image : null} alt="" />
      <div className={chatStyle.container}>
        <aside>
          <article className={chatStyle.searchContainer}>
            <label htmlFor="searchBar">Search for your friends:</label>
            <div>
              <input type="text" id="searchBar" ref={searchValue} />
              <img
                src={searhIcon}
                alt="search button"
                onClick={() => setSearch(searchValue.current.value)}
              />
            </div>
          </article>
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
                      className={`${
                        displayBackroundColor === i
                          ? chatStyle.bgColor
                          : chatStyle.standardBg
                      } ${
                        usersData.usernameDoc
                          .toLowerCase()
                          .includes(search.toLowerCase())
                          ? chatStyle.display
                          : chatStyle.hide
                      }`}
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
          {displayContainer ? (
            <>
              <ul>
                <li>
                  <div className={chatStyle.imgDiv}></div>
                  {/* change image as soon as possible  */}
                </li>
                <li>
                  <span>{getUserDoc}</span>
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
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "50px",
                lineHeight: "calc(100vh - 140px)",
              }}
            >
              Please select user to start chatting
            </div>
          )}
        </main>
      </div>
    </>
  )
}