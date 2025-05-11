import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/connectDB";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const db = await connectDB();
        const user = await db.collection("users").findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || "",
          role: user.role || "User",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin", // Optional: reuse the sign-in page to display auth errors
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
