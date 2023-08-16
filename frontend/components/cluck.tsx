import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import Link from 'next/link'

import { useState, useEffect } from "react"

export interface Props {
	user_id: number
	cluck_id: number
	author: string,
	content: string,
	created_at: string,
	is_deleted: boolean,
}


import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export default function Cluck({ user_id, cluck_id, author, content, created_at, is_deleted }: Props) {

	let selected_date = new Date(created_at)

	const [liked, setLiked] = useState(false)

	const likeHandler = async (e: any) => {
		e.preventDefault()
		const updatedLiked = !liked
		setLiked(updatedLiked)

		console.log(updatedLiked)

		if (updatedLiked) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user: user_id, cluck: cluck_id })
			}
			const response = await fetch(`http://127.0.0.1:9000/api/like_detail/`, requestOptions)
			const data = await response.json()
			if (data.status_code == 201) {
				setLiked(updatedLiked)
			}
		} else {
			// this means they 'unliked' it, we need to send a delete
			const requestOptions = {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ user: user_id, cluck: cluck_id })
			}
			const response = await fetch(`http://127.0.0.1:9000/api/like_detail/`, requestOptions)
			const data = await response.json()
			if (data.status_code == 204) {
				setLiked(updatedLiked)
			}
		}
	}


	useEffect(() => {
		// check if the user has previously like this cluck, and setLiked accordingly
		const getLiked = async () => {
			const response = await fetch(`http://127.0.0.1:9000/api/like_detail/?cluck=${cluck_id}&user=${user_id}`)
			const data = await response.json()
			if (data?.status_code == 200) {
				console.log(data)
				setLiked(true)
			}
		}
		getLiked()
	}, [])

	return (
		<Card className="border-black rounded-2xl border-2 border-b-4 border-r-4 shadow-xl">
			<CardHeader>
				<CardTitle><Link className="hover:underline" href={`/user/${author}`}>{author}</Link></CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent >
				<p>{content}</p>
			</CardContent>
			<CardFooter className="justify-end">
				<button onClick={likeHandler}>
					{/* SVG FROM https://www.svgrepo.com/svg/513469/heart */}
					<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
						width="25px" height="25px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
						<g>
							<path fill="#000000" d="M48,5c-4.418,0-8.418,1.793-11.312,4.688L32,14.344l-4.688-4.656C24.418,6.793,20.418,5,16,5
		C7.164,5,0,12.164,0,21c0,4.418,2.852,8.543,5.75,11.438l23.422,23.426c1.562,1.562,4.094,1.562,5.656,0L58.188,32.5
		C61.086,29.605,64,25.418,64,21C64,12.164,56.836,5,48,5z M32,47.375L11.375,26.75C9.926,25.305,8,23.211,8,21c0-4.418,3.582-8,8-8
		c2.211,0,4.211,0.895,5.656,2.344l7.516,7.484c1.562,1.562,4.094,1.562,5.656,0l7.516-7.484C43.789,13.895,45.789,13,48,13
		c4.418,0,8,3.582,8,8c0,2.211-1.926,4.305-3.375,5.75L32,47.375z"/>
							<path fill={liked ? "#ef4444" : "#FFFFFF"} d="M32,47.375L11.375,26.75C9.926,25.305,8,23.211,8,21c0-4.418,3.582-8,8-8c2.211,0,4.211,0.895,5.656,2.344
		l7.516,7.484c1.562,1.562,4.094,1.562,5.656,0l7.516-7.484C43.789,13.895,45.789,13,48,13c4.418,0,8,3.582,8,8
		c0,2.211-1.926,4.305-3.375,5.75L32,47.375z"/>
						</g>
					</svg>
				</button>
			</CardFooter>
		</Card >
	)
}
