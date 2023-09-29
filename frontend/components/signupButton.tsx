"use client"

import { signIn } from 'next-auth/react'
import React from 'react'

export default function SignUpButton() {


    const handleClick = async () => {
        console.log('signin handler')
        await signIn("google", { callbackUrl: '/signup' })
    }

    return (
        <button onClick={handleClick} className='mx-auto underline'>
            create an account
        </button>
    )
}
