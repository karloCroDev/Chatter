import React, { createContext, useEffect, useState } from "react"
import { auth, db } from "../firebase.js"
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore"
export const UserContext = createContext()

export const FirebaseManagment = ({ children }) => {
  //////Getting users and message system
  const [user, setUser] = useState("")
  const [getMessages, setGetMessages] = useState("")
  const [reciever, setReciever] = useState("")
  const conversationRef = collection(db, "conversations")

  const filterUsers = (snapshot) => {
    const data = snapshot.docs.map((x) => ({ ...x.data(), id: x.id }))
    setGetMessages(data)
  }

  const getReciever = async (rec) => {
    const relationVar = `${user} ${rec}`
    const relationVarReversed = `${rec} ${user}`
    setReciever(rec)

    const q = query(
      conversationRef,
      where("relation", "in", [relationVar, relationVarReversed])
    )

    onSnapshot(q, (snapshot) => {
      if (snapshot.size > 0) {
        filterUsers(snapshot)
      } else {
        noConversation()
      }
    })

    async function noConversation() {
      try {
        await addDoc(conversationRef, {
          content: [],
          relation: relationVar,
        })

        const q2 = query(conversationRef, where("relation", "==", relationVar))

        onSnapshot(q2, (doc) => {
          filterUsers(doc)
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  // message system
  const messageFunc = async (value) => {
    try {
      const docRef = getMessages ? getMessages[0].id : null
      await updateDoc(doc(db, "conversations", docRef), {
        content: arrayUnion({ message: value, sender: user }),
      })
    } catch (err) {
      console.error(err)
      alert("No user selected")
    }
  }

  /////////////////////navigate
  const navigator = useNavigate()
  //signUp functionality

  const UsersData = collection(db, "UsersData")

  const signUp = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      await updateProfile(user, {
        displayName: username,
      })

      await addDoc(UsersData, {
        usernameDoc: username,
        emailDoc: email,
        active: true,
      })

      // navigator("/chat")
      window.location.reload()
    } catch (err) {
      console.error(err)
      alert("Something wrong! Change your email or passoword")
    }
  }

  //sign in functionality
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigator("/chat")
    } catch (err) {
      console.error(err)
      alert("Something wrong! Please check for your email or password!")
    }
  }
  //sign out functionality
  const signOutFunc = async () => {
    try {
      const q = query(UsersData, where("usernameDoc", "==", user))
      const querySnapshot = await getDocs(q)
      await updateDoc(doc(db, "UsersData", querySnapshot.docs[0].id), {
        active: false,
      })
      await signOut(auth)
      console.log("Successfully signed out ")
      setUser("") //because when I log out untill I refresh there is still user icon soo
      navigator("/")
    } catch (err) {
      console.error(err)
    }
  }
  //onAuthStateChanged and user info
  //user state is on top of this document

  useEffect(() => {
    onAuthStateChanged(auth, (userParam) => {
      if (userParam) {
        console.log(userParam.displayName)
        setUser(userParam.displayName)

        navigator("/chat")
      }
      if (!userParam) console.log("No user")
    })
  }, [])
  // displaying the users
  const [getUsers, setGetUsers] = useState("")

  useEffect(() => {
    try {
      const q = query(UsersData, where("usernameDoc", "!=", user))
      onSnapshot(q, (doc) => {
        const data = doc.docs.map((x) => ({ ...x.data(), id: x.id }))
        setGetUsers(data)
      })
    } catch (err) {
      console.error(err)
    }
  }, [user])

  ////////

  return (
    <UserContext.Provider
      value={{
        signUp,
        signIn,
        signOutFunc,
        user,
        getUsers,
        messageFunc,
        getReciever,
        getMessages,
        reciever,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
