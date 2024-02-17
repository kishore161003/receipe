import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDatabase } from "@lib/database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // ... (unchanged)
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const db = await connectToDatabase();
          const existingUser = await User.findOne({ email: credentials.email });

          // User already exists, check password
          if (existingUser.password === credentials.password) {
            return existingUser;
          }

          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },

      secret: process.env.NEXTAUTH_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/login",
  },
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
