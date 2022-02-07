import { Button, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiGithub } from "react-icons/fi";

import { useAuth } from "../hooks/useAuth";

const DEFAULT_RETRUN_URL = "/";

const Login = () => {
  const { session, signInWithGithub } = useAuth();
  const router = useRouter();

  const handleSignInWithGithub = () => {
    signInWithGithub();
  };

  useEffect(() => {
    if (session) {
      // TODO: returnUrlが存在する場合、returnUrlに遷移させる
      // const returnUrl = router.query.returnUrl || DEFAULT_RETRUN_URL;
      const returnUrl = DEFAULT_RETRUN_URL;
      router.push({
        pathname: returnUrl as string,
      });
    }
  }, [router, session]);

  return (
    <Center h="100vh">
      <Button onClick={handleSignInWithGithub} leftIcon={<FiGithub />}>
        GitHubでログイン
      </Button>
    </Center>
  );
};

export default Login;
