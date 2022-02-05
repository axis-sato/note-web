import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

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
      <Button alignSelf="start">保存</Button>
    </Flex>
  );
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const NoteEditor = () => {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  return (
    <Box h="100%">
      <MDEditor value={value} onChange={setValue} height={500} />
    </Box>
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
