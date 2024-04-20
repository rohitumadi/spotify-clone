"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

export default function ListItem({ image, name, href }: ListItemProps) {
  const router = useRouter();
  const onClick = () => {
    // add auth before push
    router.push(href);
  };

  return (
    <button
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4
    bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px] bg-black/10">
        <Image className="object-cover" fill src={image} alt="Playlist image" />
      </div>
      <p className="font-medium truncate py-3">{name}</p>
      <div
        className="absolute  right-5 opacity-0 group-hover:opacity-100 transition rounded-full
      bg-green-500 p-3 drop-shadow-md hover:scale-110 flex
      items-center justify-center"
        onClick={onClick}
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
}
