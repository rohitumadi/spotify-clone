"use client";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}
export default function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen is mobile or not
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width threshold as needed
    };

    // Initial check when component mounts
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const player = usePlayer();

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousSong);
  };
  return (
    <div className="h-full grid grid-cols-2  md:grid-cols-3">
      <div className="flex  items-center justify-start ">
        <MediaItem song={song} />
        <LikeButton songId={song.id} />
      </div>

      {isMobile ? (
        <div className="sm:hidden  h-full  justify-center items-center w-full max-w-[722px] gap-x-6">
          <AudioPlayer
            customAdditionalControls={[]}
            style={{
              backgroundColor: "transparent",

              padding: "0px",
              boxShadow: "none",
              marginBottom: "10px",
            }}
            customIcons={{
              play: <BsPlayFill size={30} className="text-white" />,
              pause: <BsPauseFill size={30} className="text-white" />,
            }}
            showSkipControls={true}
            autoPlay
            onEnded={onPlayNext}
            customVolumeControls={[]}
            showJumpControls={false}
            onClickNext={onPlayNext}
            onClickPrevious={onPlayPrevious}
            src={songUrl}
          />
        </div>
      ) : (
        <div className="hidden h-full sm:flex justify-center items-center w-full max-w-[722px] gap-x-6">
          <AudioPlayer
            customAdditionalControls={[]}
            style={{
              backgroundColor: "transparent",

              padding: "0px",
              boxShadow: "none",
              marginBottom: "10px",
            }}
            customIcons={{
              play: <BsPlayFill size={30} className="text-white" />,
              pause: <BsPauseFill size={30} className="text-white" />,
            }}
            showSkipControls={true}
            autoPlay
            onEnded={onPlayNext}
            showJumpControls={false}
            onClickNext={onPlayNext}
            onClickPrevious={onPlayPrevious}
            src={songUrl}
          />
        </div>
      )}
    </div>
  );
}
