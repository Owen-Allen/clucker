"use client"

import { redirect } from "next/navigation";

import React, { useState, useEffect } from 'react'
import Cluck from '@/components/cluck'

interface Props {
    session: any,
}

export default function FeedClucks({ session }: Props) {
    const [clucks, setClucks] = useState([])
    const user = session.user


    useEffect(() => {
        const getClucks = async () => {
            const headers = {
                Authorization: `Bearer ${session.id_token}`,
              }        
            const response = await fetch(`${process.env.DB_HOST}/api/feed/?id=${user.id}`, {method: "GET", headers: headers})
            if(response.status === 200){
                const data = await response.json()
                // console.log(data)
                setClucks(data.clucks)
            }
        }
        if (user) { getClucks() }
    }, [user, session.id_token])

    return (
        <div className="w-full flex flex-col gap-4">
            {clucks.map((c: any) => <Cluck key={c.id} user_id={user.id} cluck_id={c.id} author={c.author} content={c.content} created_at={c.created_at} is_deleted={c.is_deleted} />)}
        </div>
    )
}
