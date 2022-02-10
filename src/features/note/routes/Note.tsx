import { Box, Flex } from "@chakra-ui/react";

import MainLayout from "@/components/Layout/MainLayout";

import NoteEditorPane from "../components/NoteEditorPane";
import NoteList from "../components/NoteList";

const Note = () => {
  return (
    <MainLayout title="トップ">
      <Flex h="100vh">
        <Box w="230px" h="100%" bg="gray.100">
          <NoteList />
        </Box>
        <Box flex="1" p="3">
          <NoteEditorPane />
        </Box>
      </Flex>
    </MainLayout>
  );
};

export default Note;
