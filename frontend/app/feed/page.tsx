import React, { useState, useEffect } from 'react'

import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import FeedClucks from '@/components/feedClucks'
import { Modal } from '@/components/modal'
import CluckForm from '@/components/cluckForm'

interface Props {
  searchParams : Record<string,string> | null | undefined
}

export default async function Page({ searchParams } : Props ) {
  const session = await getServerSession(authOptions)
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between py-4 px-16 bg-sky-400">
       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
         {!!searchParams?.cluckModal && <Modal> <CluckForm user={session.user}/> </Modal>}
         {session && <FeedClucks user={session.user}/>}
      </div>
    </main>
    </>
      )
}



