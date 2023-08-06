import React, { useContext } from "react"
import { UserContext } from "./FirebaseManagment"
import { Navigate } from "react-router-dom"
export const Protected = ({ children }) => {
  const { user } = useContext(UserContext)
  if (!user) {
    return <Navigate to="/"></Navigate>
  }
  return children
}
