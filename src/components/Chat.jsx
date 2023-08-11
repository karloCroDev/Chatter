import React, { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "./FirebaseManagment"
import chatStyle from "../styles/chat.module.css"
import sendMessage from "../assets/send.png"
import searhIcon from "../assets/search.png"
export const Chat = () => {
  const { user, getUsers, messageFunc, getReciever, getMessages } =
    useContext(UserContext)
  const [displayBackroundColor, setDisplayBackgroundColor] = useState(null)
  const [getUserDoc, setGetUserDoc] = useState("")
  const [displayContainer, setDisplayContainer] = useState(false)
  const inputValue = useRef()
  ///search section
  const searchValue = useRef()
  const [search, setSearch] = useState("")
  const [active, setActive] = useState("")
  const getUser = (index, id) => {
    setDisplayBackgroundColor(index)
  }

  //this useEffect is essentially to update setActive whenever  getUsers changes like setting active to false so this will change style too
  //this is done because it was getting to much renders
  useEffect(() => {
    getUsers
      ? getUsers.map((usersData, i) => {
          setActive(usersData.active)
        })
      : null
  }, [getUsers])

  // console.log(image)
  return (
    <>
      <div className={chatStyle.container}>
        <aside>
          <article className={chatStyle.searchContainer}>
            <label htmlFor="searchBar">Search for your friends:</label>
            <div>
              <input
                type="text"
                id="searchBar"
                ref={searchValue}
                placeholder="Enter your friend "
                onChange={() => setSearch(searchValue.current.value)}
              />
              <img src={searhIcon} alt="search button" />
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
                        setActive(usersData.active)
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
                      <div
                        className={
                          usersData.active
                            ? chatStyle.imgDivGreen
                            : chatStyle.imgDiv
                        }
                      ></div>
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
                  <div
                    className={
                      active ? chatStyle.imgDivGreen : chatStyle.imgDiv
                    }
                  ></div>
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
                          {x.message.substring("0", "50")}
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
