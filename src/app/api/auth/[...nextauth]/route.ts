import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

// handle GET & POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
