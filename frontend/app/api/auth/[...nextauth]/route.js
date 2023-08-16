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

      // STEPS
      // 1. if they are logged in with session.user.id, return session
      // 2. elif, check if they have an account registered with their email then assign the email and send them to feed
      // 3. elif, send them to sign up page

      if(session.user.id){
        return session
      }

      const res = await fetch(`http://127.0.0.1:9000/api/userid/?email=${session.user.email}`)
      const user = await res.json()

      if (user?.id){ // they already have an account
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