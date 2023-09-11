"use client"

import React, { useState, useEffect } from 'react'
import Cluck from '@/components/cluck'

export default function ProfileClucks({ user, profile }: any) {
    
    const [clucks, setClucks] = useState([])

    useEffect(() => {
        const getClucks = async () => {
            const response = await fetch(`http://127.0.0.1:9000/api/clucks_author/?author=${profile.id}`)
            const data = await response.json()
            if(response.status == 200){
                setClucks(data["clucks"])
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
