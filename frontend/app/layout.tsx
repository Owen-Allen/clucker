import "./globals.css";
import type { Metadata } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Toaster } from "@/components/ui/toaster";

import Provider from "@/components/provider";

export const metadata: Metadata = {
  title: "Clucker",
  description: "",
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
        <body className={`bg-sky-400`}>
        <Provider session={session}>
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  )
}
