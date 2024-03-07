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
  const [userUid, setUserUid] = useState("")

  //Trigger to onAuthStatChanged temporary fix
  const [trigger, setTrigger] = useState(0)

  //////Getting users and message system
  const [user, setUser] = useState("")
  const [getMessages, setGetMessages] = useState("")
  const [reciever, setReciever] = useState("")
  const [image, setImage] = useState("")
  const conversationRef = collection(db, "conversations")
  const UsersData = collection(db, "UsersData")

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

  const signUp = async (username, email, password) => {
    const q = query(UsersData, where("usernameDoc", "==", username))
    const check = await getDocs(q)
    if (check.size > 0) {
      alert("Username already exists")
    }
    if (check.size == 0) {
      validation()
    }

    //because of hoisting so no variable
    async function validation() {
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

        setTrigger(trigger + 1)
      } catch (err) {
        console.error(err)
        alert("Something wrong! Change your email or passoword")
      }
    }
  }

  //sign in functionality
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setTrigger(trigger + 1)
    } catch (err) {
      console.error(err)
      alert("Something wrong! Please check for your email or password!")
    }
  }
  //sign out functionality
  const signOutFunc = async () => {
    try {
      // const q = query(UsersData, where("usernameDoc", "==", user))
      // const querySnapshot = await getDocs(q)
      // await updateDoc(doc(db, "UsersData", querySnapshot.docs[0].id), {
      //   active: false,
      // })
      activeUser(false)

      await signOut(auth)
      setTrigger(trigger + 1) //just to trigger

      navigator("/")
    } catch (err) {
      console.error(err)
    }
  }
  //onAuthStateChanged and user info
  //user state is on top of this document

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userParam) => {
      if (userParam) {
        setUserUid(userParam.uid)
        setUser(userParam.displayName)
        setImage(userParam.photoURL)
        navigator("/chat")
      }
      if (!userParam) setUser("")
    })
    return unsub()
  }, [trigger])
  // displaying the users
  const [getUsers, setGetUsers] = useState("")

  useEffect(() => {
    const q = query(UsersData, where("usernameDoc", "!=", user))
    const unsubscribe = onSnapshot(q, (doc) => {
      const data = doc.docs.map((x) => ({ ...x.data(), id: x.id }))
      setGetUsers(data)
      activeUser(true)
    })

    return () => {
      unsubscribe()
    }
  }, [user])

  async function activeUser(status) {
    try {
      const q = query(UsersData, where("usernameDoc", "==", user))
      const querySnapshot = await getDocs(q)
      console.log(querySnapshot.docs)
      await updateDoc(doc(db, "UsersData", querySnapshot.docs[0].id), {
        active: status,
      })
    } catch (err) {
      console.error(err)
    }
  }
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
        userUid,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
