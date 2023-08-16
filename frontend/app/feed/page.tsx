import React, { useState, useEffect } from 'react'

import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import FeedClucks from '@/components/feedClucks'


export default async function Page() {


  // const response = await fetch(`http://127.0.0.1:9000/api/feed/`,{ next: { revalidate: 100 } })
  // const data = await response.json()
  // const clucks = data['clucks']
  // console.log(clucks)

  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-4 px-16 bg-sky-400">
       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"> {/* removed w-full */}
         {session && <FeedClucks user={session.user}/>}
      </div>
    </main>  )
}



