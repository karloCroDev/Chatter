import React, { createContext, useState } from "react"
import { storage } from "../firebase.js"
import { ref, uploadBytes } from "firebase/storage"
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

  return (
    <>
      <ImageContx.Provider value={{ uploadImageFunc }}>
        {children}
      </ImageContx.Provider>
    </>
  )
}

export default ImageUpload
