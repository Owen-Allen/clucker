"use client"
import { useState } from 'react'

import ProfileHeader from "@/components/profileHeader"
import ProfileClucks from "@/components/profileClucks"
import ProfileLikes from "@/components/profileLikes"

export default function ProfileContent({user, profile}: any) {
  const [menu, setMenu ] = useState("clucks") // might be better for this to be a query param instead, no state required
  return (
    <div className="flex flex-col gap-4">
      <ProfileHeader user={user} profile={profile} menu={menu} setMenu={setMenu}/>
      {menu == "clucks" && <ProfileClucks user={user} profile={profile}/>}
      {menu == "likes" &&  <ProfileLikes user={user} profile={profile}/>}
      {menu == "replies" &&  <div className="text-center mt-8 font-mono text-2xl"> Coming Soon! </div>}
    </div>
  )
}
