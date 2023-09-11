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
        if(!isMyProfile){
            getFollowing()
        }
    }, [user.id, profile.id, isMyProfile])

    // console.log(isMyProfile)
    return (
        <Card className="border-black rounded-2xl border-2 border-b-4 border-r-4 shadow-xl">
            <div className="flex flex-row">
                <CardHeader>
                    <CardTitle><Link className="hover:underline" href={`/user/${profile.id}`}>{profile.id}</Link></CardTitle>
                    <CardDescription>{profile.name} </CardDescription>
                </CardHeader>
                <CardHeader className="ml-auto">
                    <CardTitle className="flex flex-row gap-2 sm:gap-8">
                    
                    {/*  If it is your profile, show the settings button, otherwise, show the follow/following button */}
                    {isMyProfile ? 
                        // Profile editing
                        // <button onClick={() => {}}>
                        //     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        //     <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0175 19C10.6601 19 10.3552 18.7347 10.297 18.373C10.2434 18.0804 10.038 17.8413 9.76171 17.75C9.53658 17.6707 9.31645 17.5772 9.10261 17.47C8.84815 17.3365 8.54289 17.3565 8.30701 17.522C8.02156 17.7325 7.62943 17.6999 7.38076 17.445L6.41356 16.453C6.15326 16.186 6.11944 15.7651 6.33361 15.458C6.49878 15.2105 6.52257 14.8914 6.39601 14.621C6.31262 14.4332 6.23906 14.2409 6.17566 14.045C6.08485 13.7363 5.8342 13.5051 5.52533 13.445C5.15287 13.384 4.8779 13.0559 4.87501 12.669V11.428C4.87303 10.9821 5.18705 10.6007 5.61601 10.528C5.94143 10.4645 6.21316 10.2359 6.33751 9.921C6.37456 9.83233 6.41356 9.74433 6.45451 9.657C6.61989 9.33044 6.59705 8.93711 6.39503 8.633C6.1424 8.27288 6.18119 7.77809 6.48668 7.464L7.19746 6.735C7.54802 6.37532 8.1009 6.32877 8.50396 6.625L8.52638 6.641C8.82735 6.84876 9.21033 6.88639 9.54428 6.741C9.90155 6.60911 10.1649 6.29424 10.2375 5.912L10.2473 5.878C10.3275 5.37197 10.7536 5.00021 11.2535 5H12.1115C12.6248 4.99976 13.0629 5.38057 13.1469 5.9L13.1625 5.97C13.2314 6.33617 13.4811 6.63922 13.8216 6.77C14.1498 6.91447 14.5272 6.87674 14.822 6.67L14.8707 6.634C15.2842 6.32834 15.8528 6.37535 16.2133 6.745L16.8675 7.417C17.1954 7.75516 17.2366 8.28693 16.965 8.674C16.7522 8.99752 16.7251 9.41325 16.8938 9.763L16.9358 9.863C17.0724 10.2045 17.3681 10.452 17.7216 10.521C18.1837 10.5983 18.5235 11.0069 18.525 11.487V12.6C18.5249 13.0234 18.2263 13.3846 17.8191 13.454C17.4842 13.5199 17.2114 13.7686 17.1083 14.102C17.0628 14.2353 17.0121 14.3687 16.9562 14.502C16.8261 14.795 16.855 15.1364 17.0323 15.402C17.2662 15.7358 17.2299 16.1943 16.9465 16.485L16.0388 17.417C15.7792 17.6832 15.3698 17.7175 15.0716 17.498C14.8226 17.3235 14.5001 17.3043 14.2331 17.448C14.0428 17.5447 13.8475 17.6305 13.6481 17.705C13.3692 17.8037 13.1636 18.0485 13.1099 18.346C13.053 18.7203 12.7401 18.9972 12.3708 19H11.0175Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"/>
                        //     <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9747 12C13.9747 13.2885 12.9563 14.333 11.7 14.333C10.4437 14.333 9.42533 13.2885 9.42533 12C9.42533 10.7115 10.4437 9.66699 11.7 9.66699C12.9563 9.66699 13.9747 10.7115 13.9747 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"/>
                        //     </svg>
                        // </button>
                        null
                                                : (
                        isFollowing ? 
                            <Button className="mr-4 w-24 bg-yellow-300 text-black hover:bg-yellow-300 disabled:pointer-events-none" id='following' onClick={followHandler}> Following </Button>
                         : 
                            <Button className="mr-4 w-24 bg-red-500 text-black hover:bg-red-500 disabled:pointer-events-none" id='follow' onClick={followHandler}> Follow </Button>
                        
                        )}
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
