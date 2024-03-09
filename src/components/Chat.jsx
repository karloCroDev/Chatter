import React, { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "./FirebaseManagment"
import chatStyle from "../styles/chat.module.css"
import sendMessage from "../assets/send.png"
import searhIcon from "../assets/search.png"

export const Chat = () => {
  const { user, getUsers, messageFunc, getReciever, getMessages, image } =
    useContext(UserContext)
  const [displayBackroundColor, setDisplayBackgroundColor] = useState(null)
  const [getUserDoc, setGetUserDoc] = useState("")
  const [displayContainer, setDisplayContainer] = useState(false)
  const inputValue = useRef()
  const btnEl = useRef()
  ///search section
  const searchValue = useRef()
  const [search, setSearch] = useState("")
  const [active, setActive] = useState("")
  const [imageFromDb, setIMageFromDb] = useState("")
  const getUser = (index, id) => {
    setDisplayBackgroundColor(index)
  }
  console.log(image)
  //this useEffect is essentially to update setActive whenever  getUsers changes like setting active to false so this will change style too

  useEffect(() => {
    getUsers
      ? getUsers.map((usersData) => {
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
                if (imageFromDb === "") setIMageFromDb(usersData.image)
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
                      <div className={chatStyle.imageContainer}>
                        <img src={usersData.image} alt="pfpImage" />
                        <div
                          className={
                            usersData.active
                              ? chatStyle.imgDivGreen
                              : chatStyle.imgDiv
                          }
                        ></div>
                      </div>
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
                  <div className={chatStyle.imageContainer}>
                    <img src={imageFromDb} alt="pfpImage" />
                    <div
                      className={
                        active ? chatStyle.imgDivGreen : chatStyle.imgDiv
                      }
                    ></div>
                  </div>
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
                          <p>
                            {x.message.split(" ")[0][0].toUpperCase() +
                              x.message.substring(1)}
                          </p>
                        </li>
                      ))
                    : null}
                </ul>
                <div className={chatStyle.sendMessage}>
                  <input
                    type="text"
                    placeholder="Enter your message..."
                    ref={inputValue}
                    onKeyDown={(e) => {
                      e.key === "Enter" ? btnEl.current.click() : null
                      console.log(e.key)
                    }}
                  />
                  <button
                    className={chatStyle.sendMessageFalse}
                    ref={btnEl}
                    onClick={() => {
                      if (
                        inputValue.current.value.length > 0 &&
                        inputValue.current.value.length < 51
                      ) {
                        messageFunc(inputValue.current.value)
                        inputValue.current.value = ""
                      } else {
                        alert(
                          "Your message must need atleast 1 charachter and maximum of 50  charachters"
                        )
                      }
                    }}
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
