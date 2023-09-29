import { redirect } from 'next/navigation'

import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import { Modal } from '@/components/modal'
import CluckForm from '@/components/cluckForm'
import Nav from '@/components/nav'
import SearchCard from '@/components/searchCard'
import ProfilesCard from '@/components/profilesCard'

interface Props {
  searchParams : Record<string,string> | null | undefined
}

export default async function Search({ searchParams } : Props ) {

  // we could create a filter search param, and then pass it to the searchCard


  const session = await getServerSession(authOptions)
  const user = session?.user

  if(!session){
    redirect('/signin')
  }

  if(user && user?.email && !user?.id){
    // signed in, but we don't have an account with this email
    redirect('/signup')
  }
  
  let query = ""
  if(searchParams !== null && searchParams !== undefined){
    query = searchParams.q
  }
  if(!query){
    // when the page is inially loaded, the searchParams are empty. I want to show all the users
    query = ""
  }
  console.log('query: ' + query)
  return (
    <>
    <Nav user_id={session.user.id}/>
    <main className="flex min-h-screen flex-col items-center justify-between py-4 px-8 bg-sky-400"> 
       <div className="flex flex-col w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
         {!!searchParams?.cluckModal && <Modal> <CluckForm user={session.user}/> </Modal>}
            <SearchCard/>
            <div className="mt-4 w-11/12 flex ml-auto flex-col gap-4">
            <ProfilesCard user_id={user.id} id_token={session.id_token} query={query}/>
            </div>
      </div>
    </main>
    </>
      )
}



