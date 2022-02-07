import { Box, Button, Center, Text } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";

import { APP_NAME } from "@/constants";
import { useAuth } from "@/features/auth/hooks/useAuth";

const SidebarContent = () => {
  return <></>;
};

const SIDEBAR_W = "200px";
const SideBar = () => {
  const { signOut } = useAuth();
  return (
    <>
      <Box position="fixed" left={0} top={0} w={SIDEBAR_W} h="100%">
        <Center py={3} bg="gray.900" w="100%">
          <Text
            justifyContent="center"
            color="gray.300"
            fontWeight="bold"
            fontSize="xl"
          >
            {APP_NAME}
          </Text>
        </Center>
        <Box p={5} w={SIDEBAR_W} h="100%" bg="gray.800">
          <Button onClick={() => signOut()}>サインアウト</Button>
          <SidebarContent />
        </Box>
      </Box>
    </>
  );
};

type MainLayoutProps = { children: ReactNode; title?: string };

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <Box>
      <Head>
        <title>
          {APP_NAME}
          {title ? `-${title}` : null}
        </title>
      </Head>

      <SideBar />
      <Box as="main" ml={SIDEBAR_W}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
