import React from 'react'

import ProfileContent from "@/components/profileContent"

import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'



export default async function Page({ params }: { params: { id: string } }) {
    const res = await fetch(`http://127.0.0.1:9000/api/user/${params.id}`, { next: { revalidate: 100 } })
    const profile = await res.json()
    const session = await getServerSession(authOptions)

    return (
      <main className="flex min-h-screen flex-col items-center justify-between px-12 py-4 bg-sky-400">
         <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"> {/* removed w-full */}
           <div className="w-full flex flex-col">
            <ProfileContent user={session.user} profile={profile}/>
            </div>
        </div>
      </main>  )
  }
  
  