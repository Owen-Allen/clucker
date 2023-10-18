"use client"

import { signIn } from 'next-auth/react'
import React from 'react'
import isWebview from "is-ua-webview"
import { useToast } from "@/components/ui/use-toast"

export default function SignUpButton() {
    const { toast } = useToast()


    const handleClick = async () => {
        if (isWebview(window.navigator.userAgent)) {
            toast({title: "Uh oh!",
                  description: "Google does not support this browser for signin. Please use Safari or Chrome."
            })
            return
          }
        await signIn("google", { callbackUrl: '/signup' })
    }


    return (
        <button onClick={handleClick} className='mx-auto underline'>
            create an account
        </button>
    )
}
