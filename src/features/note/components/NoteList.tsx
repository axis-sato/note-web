import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FiX, FiEdit } from "react-icons/fi";

import range from "@/utils/range";

import { useNotes } from "../hooks/useNotes";
import { Note } from "../types";

const NoteSearchForm = () => {
  const [value, setValue] = useState("");
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClearIconClick = () => {
    setValue("");
  };

  return (
    <InputGroup>
      <Input
        placeholder="検索"
        border="none"
        value={value}
        onChange={handleValueChange}
      />
      {value && (
        <InputRightElement>
          <IconButton
            aria-label="検索クリア"
            icon={<FiX />}
            bgColor="transparent"
            _hover={{ bg: "transparent" }}
            onClick={handleClearIconClick}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

const NoteCreateButton = () => {
  return (
    <IconButton
      aria-label="note作成"
      icon={<FiEdit />}
      bgColor="transparent"
      _hover={{ bg: "transparent" }}
    />
  );
};

type NotesTableProps = { notes: Note[] };
const NotesTable = ({ notes }: NotesTableProps) => {
  return (
    <Table variant="simple">
      <Tbody>
        {notes.map((note) => (
          <Tr key={note.id}>
            <Td>{note.body}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
const NotesSkeletonTable = () => {
  const skeletonCount = 3;
  return (
    <Table variant="unstyled">
      <Tbody>
        {range(1, skeletonCount).map((i) => (
          <Tr key={i}>
            <Td>
              <Skeleton h="30px" w="100%" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const Header = () => {
  return (
    <>
      <HStack align="start">
        <NoteSearchForm />
        <NoteCreateButton />
      </HStack>
      <HStack>
        <Box>foo</Box>
        <Box>bar</Box>
        <Box>hoge</Box>
      </HStack>
    </>
  );
};

const NoteList = () => {
  const { notes, noteResponse, getNotes } = useNotes();

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <VStack align="stretch" h="100%">
      <Header />
      <Box overflow="auto">
        {noteResponse?.status ? (
          <NotesTable notes={notes} />
        ) : (
          <NotesSkeletonTable />
        )}
      </Box>
    </VStack>
  );
};

export default NoteList;
