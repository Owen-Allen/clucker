'use client'

import { SessionProvider } from "next-auth/react"

// https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd

// If we want to use the SessionProvider we need to do this
export default function Provider ({
  children,
  session
}: {
  children: React.ReactNode
  session: any
}): React.ReactNode {
  return <SessionProvider session={session}>
    {children}
  </SessionProvider>
}