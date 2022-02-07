import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "./useAuth";

const PUBLIC_PATHS = ["/login"];

export const useRouteGuard = () => {
  const { session, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuth = useCallback(
    (url: string) => {
      const path = url.split("?")[0];
      if (isAuthenticated && !session && !PUBLIC_PATHS.includes(path)) {
        setIsAuthorized(false);
        router.push({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      } else {
        setIsAuthorized(true);
      }
    },
    [router, isAuthenticated, session]
  );

  useEffect(() => {
    checkAuth(router.asPath);

    const hideContent = () => setIsAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", checkAuth);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, [checkAuth, router.asPath, router.events]);

  return isAuthorized;
};
