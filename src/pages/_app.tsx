import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { useRouteGuard } from "@/features/auth/hooks/useRouteGuard";

function MyApp({ Component, pageProps }: AppProps) {
  const isAuthorized = useRouteGuard();

  return (
    <ChakraProvider>
      {isAuthorized && <Component {...pageProps} />}
    </ChakraProvider>
  );
}

export default MyApp;
