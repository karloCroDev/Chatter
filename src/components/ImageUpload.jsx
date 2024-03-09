import React, { createContext, useEffect, useState } from "react"
import { auth, db, storage } from "../firebase.js"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
export const ImageContx = createContext()
const ImageUpload = ({ children }) => {
  const uploadImageFunc = async (img, uid) => {
    try {
      const imageRef = ref(storage, `pfp/${uid}`)
      const sendImg = await uploadBytes(imageRef, img)
      console.log(sendImg)
    } catch (error) {
      console.error(error)
    }
  }
  const setImage = async (uid, user) => {
    try {
      const dowURL = await getDownloadURL(ref(storage, `pfp/${uid}`))

      const q = query(
        collection(db, "UsersData"),
        where("usernameDoc", "==", user)
      )
      const querySnapshot = await getDocs(q)

      // Assuming there's only one document matching the query
      const docToUpdate = querySnapshot.docs[0]

      await updateDoc(docToUpdate, {
        image: dowURL,
      })
      console.log(q)
      // setTrigger(trigger + 1)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <ImageContx.Provider value={{ uploadImageFunc, setImage }}>
        {children}
      </ImageContx.Provider>
    </>
  )
}

export default ImageUpload
