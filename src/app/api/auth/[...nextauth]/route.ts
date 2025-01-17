import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { Account } from "next-auth";
// sign-in url: http://localhost:3000/api/auth/signin

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          include_granted_scopes: true,
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/gmail.readonly",
        },
      },
    }),
  ],
  // store session date in jwt rather than database
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // runs when user signs in or updates a session
    // attaches the OAuth access token to the JWT
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; // Optional: Store refresh token
      }
      return token;
    },
    // runs whenever a session is checked on the client side
    // exposes the access token in the client-side session, enabling API req's to gmail
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

// handle GET & POST requests
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
