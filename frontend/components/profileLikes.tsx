"use client"

import React, { useState, useEffect } from 'react'
import Cluck from '@/components/cluck'

export default function ProfileLikes({ user, profile }: any) {
    const [clucks, setClucks] = useState([])

    console.log("profile likes")
    useEffect(() => {
        const getClucks = async () => {
            const response = await fetch(`http://127.0.0.1:9000/api/like_detail/?user=${profile.id}`)
            console.log(response)

            if(response.status == 200){
                const data = await response.json()
                setClucks(data)
            }

        }
        if (user) { getClucks() }
    }, [user])

    return (
        <div className="w-11/12 flex ml-auto flex-col gap-4">
            {clucks.map((c: any) => <Cluck key={c.id} user_id={user.id} cluck_id={c.id} author={c.author} content={c.content} created_at={c.created_at} is_deleted={c.is_deleted} />)}
        </div>
    )
}
