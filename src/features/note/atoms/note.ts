import { atom, useAtom } from "jotai";

import { Note } from "../types";

const noteAtom = atom<Note | undefined>(undefined);
noteAtom.debugLabel = "note";

export const useNote = () => {
  const [note, setNote] = useAtom(noteAtom);

  return { note, setNote };
};
