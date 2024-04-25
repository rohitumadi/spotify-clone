import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

function useGetSongById(id?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    const fetchSong = async () => {
      const { data: song, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        console.log(error.message);
        return toast.error(error.message);
      }
      if (!error && song) {
        setSong(song as Song);
        setIsLoading(false);
      }
    };
    fetchSong();
  }, [id, supabaseClient]);
  return useMemo(() => ({ song, isLoading }), [song, isLoading]);
}

export default useGetSongById;
