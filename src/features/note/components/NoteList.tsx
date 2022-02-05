import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { FiX, FiEdit } from "react-icons/fi";

import range from "@/utils/range";

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

const NotesTable = () => {
  return (
    <Table variant="simple">
      <Tbody>
        {range(1, 20).map((i) => (
          <Tr key={i}>
            <Td>{i}</Td>
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
  return (
    <VStack align="stretch" h="100%">
      <Header />
      <Box overflow="auto">
        <NotesTable />
      </Box>
    </VStack>
  );
};

export default NoteList;
