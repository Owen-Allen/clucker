"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function GoogleSignInButton() {

    const handleClick = async () => {
        await signIn("google", { callbackUrl: '/feed' })
    }

    return (
        <Button
            variant="outline"
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl bg-white border-2 border-black rounded-2xl
        ">
            {/* <Image src={googleLogo} alt="Google Logo" width={20} height={20} /> */}
            <span className="ml-4 inline-block">Sign in with Google</span>
        </Button>
    )
}
