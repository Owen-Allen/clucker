import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Nav from "@/components/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Clucker",
  description: "Generated by create next app",
  icons: "/chicken.png",
};
export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={`${inter.className} bg-sky-400`}>
        {session && <Nav user={session.user}/>}
        {children}
        </body>
    </html>
  )
}
