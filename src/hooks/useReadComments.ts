import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/supabaseClient";

export const useReadComment = (article_id: string) => {
  const QUERY_KEY = ["comments", article_id];
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comment")
        .select(
          `
          *,
          profiles:user_id (
            avatar_url,
            email
          )
        `
        )
        .eq("article_id", article_id)
        .order("created_at", { ascending: true });

      if (error) {
        throw error;
      }
      return data;
    },
  });
};
