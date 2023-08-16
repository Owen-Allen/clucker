"use client"
import { useState } from 'react'

import ProfileHeader from "@/components/profileHeader"
import ProfileClucks from "@/components/profileClucks"

export default function ProfileContent({user, profile}: any) {

  const [menu, setMenu ] = useState("clucks")

  return (
    <div className="flex flex-col gap-4">
      <ProfileHeader profile={profile} menu={menu} setMenu={setMenu}/>
      {menu == "clucks" && <ProfileClucks user={user} profile={profile}/>}
      <div>


      </div>
    </div>
  )
}
