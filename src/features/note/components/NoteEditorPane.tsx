import {
  Box,
  Button,
  Flex,
  Input,
  Spacer,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { ChangeEvent, KeyboardEvent, useState } from "react";

const NoteEditorHeader = () => {
  const [tags, setTags] = useState(["react", "javascript"]);
  const [tag, setTag] = useState<string>("");
  const handleTagInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement> | undefined
  ) => {
    if (e?.key === "Tab" && tag !== "") {
      console.log("key", e?.key);
      setTags((current) => [...current, tag]);
      setTag("");
      e.preventDefault();
    }
  };
  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };
  return (
    <Flex direction="column">
      <Flex>
        <Box>フォルダ</Box>
        <Spacer />
        <Box>設定</Box>
      </Flex>
      <Flex align="center">
        <Box>
          {tags.map((tag, i) => (
            <Tag
              key={i}
              variant="solid"
              colorScheme="gray"
              ml={i !== 0 ? 1 : 0}
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton />
            </Tag>
          ))}
        </Box>
        <Box w="3"></Box>
        <Box>
          <Input
            border="none"
            size="sm"
            placeholder="タグを追加..."
            onKeyDown={handleTagInputKeyDown}
            onChange={handleTagInputChange}
            value={tag}
          />
        </Box>
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
