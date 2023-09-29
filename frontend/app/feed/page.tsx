import { redirect } from 'next/navigation'

import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import FeedClucks from '@/components/feedClucks'
import { Modal } from '@/components/modal'
import CluckForm from '@/components/cluckForm'
import Nav from '@/components/nav'

interface Props {
  searchParams : Record<string,string> | null | undefined
}

export default async function Page({ searchParams } : Props ) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if(!session){
    redirect('/signin')
  }

  if(user && user?.email && !user?.id){
    // signed in, but we don't have an account with this email
    redirect('/signup')
  }

  // changed px-16 in main to px-8
  return (
    <>
    <Nav user_id={session.user.id}/>
    <main className="flex h-max min-h-screen flex-col items-center justify-between py-4 px-8 bg-sky-400"> 
       <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
         {!!searchParams?.cluckModal && <Modal> <CluckForm user={session.user}/> </Modal>}
         {session && <FeedClucks session={session} />}
      </div>
    </main>
    </>
      )
}



