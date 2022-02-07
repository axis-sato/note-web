import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null | undefined>();

  useEffect(() => {
    setSession(supabase.auth.session());

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const signInWithGithub = () => {
    supabase.auth.signIn({ provider: "github" });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return {
    session,
    isAuthenticated: session !== undefined,
    signInWithGithub,
    signOut,
  };
};
