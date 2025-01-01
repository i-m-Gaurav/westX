'use client'

import React from 'react'
import { useSession } from "next-auth/react"


const Interests = () => {

    const {data : session } = useSession()

    console.log(session?.user)

    if (session) {
        return <p>You are an admin, welcome!</p>
      }


  return (
    <div>Interests</div>
  )
}

export default Interests