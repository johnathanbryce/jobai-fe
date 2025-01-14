// TESTING:
"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <h4>Not Logged In - Home Page Here </h4>
      <button onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}>SIGN IN</button>
    </div>
  );
}
