import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from 'next/link'
import { Button } from './ui/button'

export default function ProfileHeader({ user, profile, menu, setMenu }: any) {
    const isMyProfile = user.id == profile.id ? true : false
    const [isFollowing, setIsFollowing] = useState(false)

    const followHandler = async (e: any) => {
        e.preventDefault()
        const updatedFollowing = !isFollowing
		if (updatedFollowing) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_id: user.id, following: profile.id })
			}
			const response = await fetch(`http://127.0.0.1:9000/api/follow_detail/`, requestOptions)
			const data = await response.json()
			if (response.status == 201) {
                console.log('calling setter')
				setIsFollowing(updatedFollowing)
			}
		} else {
			// this means they unfollowed, we need to send a delete
			const requestOptions = {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user_id: user.id, following: profile.id })
			}
			const response = await fetch(`http://127.0.0.1:9000/api/follow_detail/`, requestOptions)
			if (response.status == 204) {
				setIsFollowing(updatedFollowing)
			}
		}
	}

    console.log(isMyProfile)

    useEffect(() => {
        // check if the user has previously like this cluck, and setLiked accordingly
        const getFollowing = async () => {
            const response = await fetch(`http://127.0.0.1:9000/api/follow_detail/?user_id=${user.id}&following=${profile.id}`)
            const data = await response.json()
            if (response.status === 200) {
                setIsFollowing(true)
            }else{
                setIsFollowing(false)
            }
        }
        getFollowing()
    }, [])

    // console.log(isMyProfile)
    return (
        <Card className="border-black rounded-2xl border-2 border-b-4 border-r-4 shadow-xl">
            <div className="flex flex-row">
                <CardHeader>
                    <CardTitle><Link className="hover:underline" href={`/user/${profile.id}`}>{profile.id}</Link></CardTitle>
                    <CardDescription>{profile.name} </CardDescription>
                </CardHeader>
                <CardHeader className="ml-auto">
                    <CardTitle className="flex flex-row gap-2 sm:gap-8 sm:mr-12">
                    {!isMyProfile ? (
                        isFollowing ? 
                            <Button  className="w-24 bg-yellow-300 text-black hover:bg-yellow-300 disabled:pointer-events-none" id='following' onClick={followHandler}> Following </Button>
                         : 
                            <Button className="w-24 bg-red-500 text-black hover:bg-red-500 disabled:pointer-events-none" id='follow' onClick={followHandler}> Follow </Button>
                        
                        ) : null}
                    </CardTitle>
                </CardHeader>
            </div>
            <CardContent>
                <p>{profile.about}</p>
            </CardContent>
            <CardFooter className="flex flex-row gap-4 justify-center">
                <button onClick={() => setMenu('clucks')} className={menu === "clucks" ? "font-semibold" : "hover:underline"}>clucks</button>
                <button onClick={() => setMenu('likes')} className={menu === "likes" ? "font-semibold" : "hover:underline"}>likes</button>
                <button onClick={() => setMenu('replies')} className={menu === "replies" ? "font-semibold" : "hover:underline"}>replies</button>
            </CardFooter>
        </Card >
    )
}
