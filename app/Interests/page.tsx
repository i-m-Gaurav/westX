import Interests from '@/components/Interests'
import React from 'react'
import { SessionProvider } from "next-auth/react"



const page = () => {
  return (
    <div>
        <SessionProvider>
        <Interests/>
        </SessionProvider>
    </div>
  )
}

export default page