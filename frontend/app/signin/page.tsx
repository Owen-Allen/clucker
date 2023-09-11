import React from 'react'
import GoogleSignInButton from '@/components/googleSignInButton'
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getServerSession(authOptions)

  if(session){
    redirect('/feed')
  }
  
  return (
    <div className="grid h-screen place-items-center">
      <div className="bg-white border-black rounded-2xl border-2 border-b-4 border-r-4 shadow-xl p-8 sm:px-16">
        <h1 className="font-mono text-xl font-semibold text-center p-4">Welcome to <span className="text-2xl">Clucker!</span></h1>
        <img className="rounded w-16 mx-auto" src={'/chicken.png'} alt='Profile'/>
        <div className="py-4">
          <GoogleSignInButton/>
        </div>
        <hr className="border-b border-gray-300"/>
        <div className="text-center pt-6">
          <a className='mx-auto block'> Don&apos;t have an account?</a>
          <a href="/signup" className='mx-auto underline'>create an account </a>
        </div>
        </div>
    </div>
    )
}
