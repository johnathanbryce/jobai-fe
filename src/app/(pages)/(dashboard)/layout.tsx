"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import React from "react";
/* import Header from "../layout/header/Header";
import ErrorFallback from "./_components/ErrorFallback"; */
// External Libraries
/* import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; */

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

// const queryClient = new QueryClient();

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainWrapper>
      {/* <Header /> */}
      <PageWrapper>
        <Container>
          <Box
            sx={{
              minHeight: "calc(100vh - 170px)",
            }}
          >
            {children}
            {/*   TODO: uncomment when ready for ReactQuery and Error Boundary implementation         
            
            <QueryClientProvider client={queryClient}>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={(error, info) => {
                  console.error("Logging error:", error, info);
                }}
                onReset={() => {
                  window.location.reload();
                }}
              >
                <ConfigureAmplifyClientSide />
                {children}
              </ErrorBoundary>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider> */}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
