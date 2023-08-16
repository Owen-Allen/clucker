import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Return a cookie value as part of the session
      // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
      const res = await fetch(`http://127.0.0.1:9000/api/userid/?email=${session.user.email}`)
      const user = await res.json()
      // console.log('in route callback')
      // console.log(user)

      if (user.id){ // they already have an account
        // console.log(user.id)
        session.user.id = user.id
        return session
      }else{
        // redirect to some sign up process
        return session
      }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }