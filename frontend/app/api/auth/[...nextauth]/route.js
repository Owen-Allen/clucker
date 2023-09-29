import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


async function refreshToken(token) {
  try {
    console.log('REFRESHING TOKEN')
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      })

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshed_tokens = await response.json()
    if (!response.ok) {
      throw refreshed_tokens
    }

    return {
      ...token,
      id_token: refreshed_tokens.id_token,
      access_token: refreshed_tokens.access_token,
      expires_at: Date.now() + refreshed_tokens.expires_in * 1000,
      refresh_token: refreshed_tokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}
export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
  
      }),
  ],
  callbacks: {
    async jwt({ token, account, trigger, session }){ // https://next-auth.js.org/v3/tutorials/refresh-token-rotation
      console.log('jwt')
      if (account) {
        token.refresh_token = account.refresh_token
        token.access_token = account.access_token
        token.id_token = account.id_token
        token.expires_at = account.expires_at * 1000
        token.id = account.id // this is the user's id, fetched during signIn ^
       
      }
      if (trigger === "update" && session?.id) {
        console.log('recieved an update!')
        console.log(session.id)
        token.id = session.id
      }

      if(!token.id){
        // This section might be unnecessary, since account seems persistent
        console.log('this shouldnt happen')
        const res = await fetch(`${process.env.DB_HOST}/api/userid/?email=${token.email}`)
        if(res.status == 200){
          const data = await res.json()
          token.id = data.id
        }
      }
      if(token.expires_at < Date.now()){
        token = refreshToken(token)
      }
      return token
    },
    async session({ session, token }) { // https://next-auth.js.org/configuration/callbacks#session-callback
      console.log('session')
      if(token){
        session.access_token = token.access_token
        session.user.email = token.email
        session.id_token = token.id_token
        session.user.id = token.id
        // console.log(session.id_token)
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }