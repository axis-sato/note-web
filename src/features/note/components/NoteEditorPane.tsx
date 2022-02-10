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
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import { supabase } from "@/lib/supabaseClient";

import { useNote } from "../atoms/note";
import { useNotes } from "../atoms/notes";
import { Note } from "../types";

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
    </Flex>
  );
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type NoteEditorProps = {
  // eslint-disable-next-line unused-imports/no-unused-vars
  onChange: (value: string | undefined) => void;
};

const NoteEditor = ({ onChange }: NoteEditorProps) => {
  const { note } = useNote();
  const [value, setValue] = useState<string | undefined>(note?.body);

  useEffect(() => {
    setValue(note?.body);
  }, [note]);

  return (
    <Box h="100%">
      <MDEditor
        value={value}
        onChange={(value) => {
          setValue(value);
          onChange(value);
        }}
        height={500}
      />
    </Box>
  );
};

const NoteEditorPane = () => {
  const { note } = useNote();
  const { updateNotes } = useNotes();
  const [withChanges, setWithChanges] = useState(false);
  const body = useRef(note?.body);

  useEffect(() => {
    setWithChanges(false);
    body.current = note?.body;
  }, [note]);

  const handleNoteChange = (value: string | undefined) => {
    setWithChanges(note?.body !== value);
    body.current = value;
  };

  const updateNote = async (target: Note) => {
    const { data: newNote } = await supabase
      .from<Note>("notes")
      .update({ body: body.current ?? "" })
      .eq("id", target.id)
      .single();

    if (newNote) {
      updateNotes(newNote);
    }
  };

  const handleSave = async () => {
    if (note) {
      updateNote(note);
    }
  };

  return (
    <Flex direction="column" h="100%">
      <NoteEditorHeader />
      <Box h="3" />
      <Button alignSelf="start" disabled={!withChanges} onClick={handleSave}>
        保存
      </Button>
      <Box h="3" />
      <NoteEditor onChange={handleNoteChange} />
    </Flex>
  );
};

export default NoteEditorPane;
