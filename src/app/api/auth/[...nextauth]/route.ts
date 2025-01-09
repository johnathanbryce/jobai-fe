import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// sign-in url: http://localhost:3000/api/auth/signin

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      // If you only want to read the user's basic profile & email:
      // authorization: { params: { scope: "openid email profile" } },

      // If you want Gmail access later (reading job postings):
      // Be mindful: scope might be: "openid email profile https://www.googleapis.com/auth/gmail.readonly"
    }),
  ],
};

// handle GET & POST requests
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
