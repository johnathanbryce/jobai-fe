import type { Metadata } from "next";
// MUI & Theme
import { StyledRoot } from "./theme/StyledRoot";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
// NextAuth
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";

export const metadata: Metadata = {
  title: "Jobai",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body /* className={`${geistSans.variable} ${geistMono.variable}`} */>
        <SessionProvider session={session}>
          <AppRouterCacheProvider>
            <StyledRoot>
              <main>{children}</main>
            </StyledRoot>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
