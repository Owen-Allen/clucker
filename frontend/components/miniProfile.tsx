"use client"
import React, { useEffect, useState } from 'react'

import FollowButton from '@/components/followButton'
import Link from 'next/link'

interface MiniProfileProps {
    user_id: string,
    profile_id: string,
    profile_name: string
}

export default function MiniProfile({user_id, profile_id, profile_name}: MiniProfileProps) {
    // Returns a card with the profile_id and profile_name and a follow button

    const [isFollowing, setIsFollowing] = useState(false)
    const [showButton, setShowButton] = useState(false)     // Rendering the follow button based on showButton removes flash of incorrect isFollowing state (is there a better way to do this?)
    const isMyProfile = user_id == profile_id


    const followHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const updatedFollowing = !isFollowing
		if (updatedFollowing) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_id: user_id, following: profile_id })
			}
			const response = await fetch(`${process.env.DB_HOST}/api/follow_detail/`, requestOptions)
			const data = await response.json()
			if (response.status == 201) {
				setIsFollowing(updatedFollowing)
			}
		} else {
			// this means they unfollowed, we need to send a delete
			const requestOptions = {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_id: user_id, following: profile_id })
			}
			const response = await fetch(`${process.env.DB_HOST}/api/follow_detail/`, requestOptions)
			if (response.status == 204) {
				setIsFollowing(updatedFollowing)
			}
		}
	}

    useEffect(() => {
        // check if the user has previously like this cluck, and setLiked accordingly
        const isFollowingThisProfile = async () => {
            const response = await fetch(`${process.env.DB_HOST}/api/follow_detail/?user_id=${user_id}&following=${profile_id}`)
            if (response.status === 200) {
                setIsFollowing(true)
            }else{
                setIsFollowing(false)
            }
            setShowButton(true) // now that we know isFollowing, it is safe to load button
        }
        if(!isMyProfile){
            isFollowingThisProfile()
        }
    }, [user_id, profile_id, isMyProfile])



  return (
        <div className="flex items-center justify-between space-x-4">
              <div>
                 <Link href={`/user/${profile_id}`} className="text-base font-medium leading-none hover:underline">{profile_id}</Link>
                 <p className="text-sm text-slate-500 text-muted-foreground">{profile_name}</p>
              </div>
              {showButton && <FollowButton isFollowing={isFollowing} followHandler={followHandler}/>} {/*!isMyProfile is not longer needed, since showButton can only be set to true if !isMyProfile*/}
        </div>
 )
}
