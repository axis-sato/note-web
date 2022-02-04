import { Box, Flex } from "@chakra-ui/react";

import MainLayout from "@/components/Layout/MainLayout";

const Note = () => {
  return (
    <MainLayout title="トップ">
      <Flex h="100vh">
        <Box w="200px" bg="blue.500">
          Box 2
        </Box>
        <Box flex="1" bg="tomato">
          Box 3
        </Box>
      </Flex>
    </MainLayout>
  );
};

export default Note;
