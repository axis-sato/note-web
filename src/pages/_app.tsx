import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { useRouteGuard } from "@/features/auth/hooks/useRouteGuard";
import AtomsDevtoolsProvider from "@/providers/AtomsDevtoolsProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const isAuthorized = useRouteGuard();

  return (
    <AtomsDevtoolsProvider>
      <ChakraProvider>
        {isAuthorized && <Component {...pageProps} />}
      </ChakraProvider>
    </AtomsDevtoolsProvider>
  );
}

export default MyApp;
