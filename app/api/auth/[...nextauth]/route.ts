import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { loginUser } from "@/lib/actions"

// Configure NextAuth
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Call our login function
          const result = await loginUser({
            email: credentials.email,
            password: credentials.password,
          })

          if (result.success) {
            // Return the user object
            return {
              id: result.data.id,
              name: result.data.name,
              email: result.data.email,
              role: result.data.role,
            }
          }

          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
    // In a real app, you would configure these with your actual credentials
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "dummy-client-secret",
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to token if user is present
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Add role to session
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }
