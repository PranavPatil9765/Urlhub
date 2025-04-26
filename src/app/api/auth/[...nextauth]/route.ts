import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectDB } from "@/libs/db";
import User from "@/libs/models/user_model";

const SECRET = process.env.JWT_SECRET || "supersecret";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();

      let existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        existingUser = new User({
          email: user.email,
          name: user.name,
          image: user.image,
        });
        await existingUser.save();
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.sessionToken = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.token = token.sessionToken; // Attach JWT session token
      return session;
    }
  },
  secret: SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);