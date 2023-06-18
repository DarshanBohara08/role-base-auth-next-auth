import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { userService } from "../../../service/UserService";
import axios from "axios";
if (!process.env.NEXTAUTH_SECRET) {
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
        const { email, password } = credentials || {};
        console.log("cre", credentials);
        return userService.signInCredentials(email, password);
        // try {
        //   const user: any = await axios.post(
        //     "https://demo-setting.gameconstruct.com/api/v1/admin/login",
        //     {
        //       password: password,
        //       email: email,
        //     }
        //   );
        //   console.log("user", user.data.data);
        //   if (user) {
        //     return user.data;
        //   }
        //   return null;
        // } catch (e: any) {
        //   console.log("e", e);
        //   throw new Error(e.response.data.message);
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("userss", user);
      console.log("toekn", user);

      /* Step 1: update the token based on the user object */
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    session({ session, token }) {
      console.log("session", session.user.role);
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
  secret: process.env.NEXTAUTH_SECRET,
});
