"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  onClick?: (id: string) => void;
  song: Song;
}
export default function MediaItem({ song, onClick }: MediaItemProps) {
  const imagePath = useLoadImage(song);
  function handleClick() {
    if (onClick) {
      return onClick(song.id);
    }
    //TODO play song
  }

  return (
    <div
      onClick={handleClick}
      className="
  flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50
  w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          className="object-cover"
          fill
          src={imagePath || "/images/liked.png"}
          alt="image"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">{song.author}</p>
      </div>
    </div>
  );
}
9;
