import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string; // Override the user property to include the extra fields and make it required.
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      first_name?: string;
      last_name?: string;
    };
  }

  interface User extends DefaultUser {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
