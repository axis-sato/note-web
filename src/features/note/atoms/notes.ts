import { atom, useAtom } from "jotai";
import { useState, useCallback } from "react";

import { supabase } from "@/lib/supabaseClient";

import { Note } from "../types";

const notesAtom = atom<Note[]>([]);
notesAtom.debugLabel = "notes";

export const useNotes = () => {
  const [notes, setNotes] = useAtom(notesAtom);
  const [isLoading, setIsLoading] = useState(false);

  const getNotes = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await supabase
      .from<Note>("notes")
      .select()
      .order("created_at", { ascending: false });

    setNotes(response.data ?? []);

    setIsLoading(false);
  }, [setNotes]);

  const updateNotes = (newNote: Note) => {
    const newNotes = notes.map((note) =>
      note.id === newNote.id ? newNote : note
    );
    setNotes(newNotes);
  };

  return { notes, getNotes, isLoading, updateNotes };
};
