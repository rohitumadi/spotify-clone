"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

export default function Player() {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);
  //dont render player if no song is playing
  if (!songUrl || !song || !player.activeId) {
    return null;
  }

  return (
    <div
      className="w-full fixed bottom-0 bg-black 
   py-2 h-[80px] px-4"
    >
      {/* whenever  key changes is destroys the element that was using it and rerenders a new component */}
      {/* we are using it here because want to enable users to skip to next song */}
      {/* so we want to ensure the player component is destroyed and re-rendered before loading new song */}
      {/* because the hook that we are using to play the song does not support dynamic url changes */}

      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
}
