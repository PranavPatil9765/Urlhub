// libs/authOptions.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/libs/db";
import User from "@/libs/models/user_model";

const SECRET = process.env.NEXTAUTH_SECRET || "supersecret";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user object with proper structure
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  
  callbacks: {
    async signIn({ user, account }) {
      // Only create user for OAuth providers (Google, GitHub)
      if (account?.provider === "google" || account?.provider === "github") {
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
        
        // Update the user id to match database id
        user.id = existingUser._id.toString();
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        
        // Create custom session token
        token.sessionToken = jwt.sign(
          { 
            id: user.id, 
            email: user.email,
            name: user.name 
          },
          JWT_SECRET,
          { expiresIn: "7d" } // Longer expiry for better UX
        );
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user && token) {
        (session.user as any).id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as any).token = token.sessionToken as string;
      }
      return session;
    },
  },
  
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  
  secret: SECRET,
};