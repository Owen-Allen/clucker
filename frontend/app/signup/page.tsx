import React from "react";
import SignupForm from "@/components/signupForm";
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
        <h1 className="font-mono text-xl font-semibold text-center p-4">
          Create an Account
        </h1>
        <img
          className="rounded w-16 mx-auto pb-4"
          src={"/chicken.png"}
          alt="Profile"
        />
        <SignupForm />
      </div>
    </div>
  );
}

