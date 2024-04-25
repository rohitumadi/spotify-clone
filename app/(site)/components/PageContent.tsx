"use client";
import { Song } from "@/types";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
  songs: Song[];
}

export default function PageContent({ songs }: PageContentProps) {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className=" gap-y-2 mt-4  text-neutral-400">No songs found</div>
    );
  }
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 
    md:grid-cols-3 lg:grid-cols-4
    xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
    >
      {songs.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          onClick={(id: string) => {
            onPlay(id);
          }}
        />
      ))}
    </div>
  );
}
