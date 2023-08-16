import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import Link from 'next/link'

export default function ProfileHeader({profile, menu, setMenu}: any) {

  return (
    <Card className="border-black rounded-2xl border-2 border-b-4 border-r-4 shadow-xl">
    <div className="flex flex-row">
    <CardHeader>
        <CardTitle>{profile.id}</CardTitle>
        <CardDescription>{profile.name} </CardDescription>
    </CardHeader>
    <CardHeader className="ml-auto">
        <CardTitle className="flex flex-row gap-2 sm:gap-8 sm:mr-12">
            <p className="text-xs">Followers 21</p>
            <p className="text-xs">Following 21</p>
        </CardTitle>

    </CardHeader>
    </div>
			<CardContent>
				<p>{profile.about}</p>
			</CardContent>
			<CardFooter className="flex flex-row gap-4 justify-center">
                <button onClick={() => setMenu('clucks')}  className={ menu === "clucks" ?  "font-semibold" : "hover:underline"}>clucks</button>
                <button onClick={() => setMenu('likes')}   className={ menu === "likes" ?   "font-semibold" : "hover:underline"}>likes</button>
                <button onClick={() => setMenu('replies')} className={ menu === "replies" ? "font-semibold" : "hover:underline"}>replies</button>
			</CardFooter>
		</Card >
	)
}
