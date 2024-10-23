/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",

      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await axios.post("http://localhost:4000/api/auth/login", {
            email,
            password,
          });

          return res.data;
        } catch (error: any) {
          if (error.response.status === 401)
            throw new Error("Invalid email or password. Please try again.");
          throw new Error("Server error. Please try again later.");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    strategy: "jwt",
    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60, // ** 30 days
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ account, user, token }) {
      console.log("🚀 ~ jwt ~ account:", account);
      console.log("🚀 ~ jwt ~ user:", user);

      if (account && user) {
        token.user = {
          email: user.email || "",
          username: user.username,
          role: user.role,
        };

        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;

        return token;
      }

      return null;
    },

    async session({ token, session }: { session: Session; token: JWT }) {
      console.log("🚀 ~ session ~ session:", session);

      if (token.user) {
        session.user = {
          email: token.user.email || "",
          username: token.user.username,
          role: token.user.role,
          accessToken: token.accessToken,
        };
      }

      return session;
    },
  },
});
