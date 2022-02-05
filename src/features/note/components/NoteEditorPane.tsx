import { Box, Flex, Spacer } from "@chakra-ui/react";

const NoteEditorHeader = () => {
  return (
    <Flex direction="column">
      <Flex>
        <Box>フォルダ</Box>
        <Spacer />
        <Box>設定</Box>
      </Flex>
      <Flex>
        <Box>タグ</Box>
      </Flex>
    </Flex>
  );
};

const NoteEditor = () => {
  return (
    <Flex bg="tomato" h="100%">
      editor
    </Flex>
  );
};

const NoteEditorPane = () => {
  return (
    <Flex direction="column" h="100%">
      <NoteEditorHeader />
      <Box h="3" />
      <NoteEditor />
    </Flex>
  );
};

export default NoteEditorPane;
