import React from "react";
import SignupForm from "@/components/signupForm";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Image from 'next/image'

export default async function Page() {

  const session = await getServerSession(authOptions)
  const user = session?.user

  if(user?.id){
    // already has signed up and is logged in
    redirect('/feed')
  }
  
  if(!user?.email){
    // they navigated to the signup page without first logging into a google account
    redirect('/signin')
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto w-5/6 sm:w-1/2 md:w-1/3 bg-white border-black rounded-2xl border-2 border-b-4 border-r-4 shadow-xl p-8 sm:px-16">
        <h1 className="font-mono text-xl font-semibold text-center p-4">
          Create an Account
        </h1>
          <Image
          className="rounded w-16 mx-auto pb-4"
          src={"/chicken.png"}
          width='64'
          height='64'
          alt="Clucker Logo"
        />
        <SignupForm email={user.email} />
      </div>
    </div>
  );
}

