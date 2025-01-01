"use client"
import { signOut } from "next-auth/react"
 
export default function Logout() {
  return <button className="cursor-pointer" onClick={() => signOut({ callbackUrl: '/' })}>Log Out</button>
}