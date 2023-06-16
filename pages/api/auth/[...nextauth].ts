import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { userService } from "../../../service/UserService";
if (!process.env.NEXT_PUBLIC_NEXTAUTH_SECRET) {
  throw new Error("Please provide process.env.NEXT_PUBLIC_NEXTAUTH_SECRET");
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials.");
        }
        const { email, password } = credentials;
        console.log("Credentials", credentials);
        return userService.signInCredentials(email, password);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      /* Step 1: update the token based on the user object */
      console.log("user", user);
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
});
