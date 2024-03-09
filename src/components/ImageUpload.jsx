import React, { createContext, useEffect, useState } from "react"
import { storage } from "../firebase.js"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

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
  const setImage = async (uid) => {
    const dowURL = await getDownloadURL(ref(storage, `pfp/${uid}`))
    console.log(dowURL)
    return dowURL
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
