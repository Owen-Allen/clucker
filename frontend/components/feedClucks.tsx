"use client"

import React, { useState, useEffect } from 'react'
import Cluck from '@/components/cluck'

interface Props {
    user: any,
}

export default function FeedClucks({ user }: Props) {
    const [clucks, setClucks] = useState([])

    useEffect(() => {
        const getClucks = async () => {
            const response = await fetch(`http://127.0.0.1:9000/api/feed/?id=${user.id}`)
            console.log(response)
            if(response.status === 200){
                const data = await response.json()
                // console.log(data)
                setClucks(data.clucks)
            }
        }
        if (user) { getClucks() }
    }, [user])


    return (
        <div className="w-full flex flex-col gap-4">
            {clucks.map((c: any) => <Cluck key={c.id} user_id={user.id} cluck_id={c.id} author={c.author} content={c.content} created_at={c.created_at} is_deleted={c.is_deleted} />)}
        </div>
    )
}
