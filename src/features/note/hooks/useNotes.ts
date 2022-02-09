import { PostgrestResponse } from "@supabase/supabase-js";
import { useCallback, useState } from "react";

import { supabase } from "@/lib/supabaseClient";

import { Note } from "../types";

export const useNotes = () => {
  const [noteResponse, setNoteResponse] = useState<PostgrestResponse<Note>>();
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await supabase
      .from<Note>("notes")
      .select()
      .order("created_at", { ascending: false });

    setNoteResponse(response);
    setNotes(response.data ?? []);
  }, []);

  return { noteResponse, notes, getNotes };
};
