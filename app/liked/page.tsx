import getLikedSongsByUser from "@/actions/getLikedSongsByUser";
import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

export default async function Liked() {
  const songs = await getLikedSongsByUser();
  return (
    <div
      className="bg-neutral-900 rounded-lg
   h-full w-full overflow-hidden overflow-y-auto"
    >
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div
              className="relative w-32 h-32 lg:h-44
  lg:w-44 "
            >
              <Image
                src="/images/liked.png"
                fill
                alt="playlist"
                className="object-cover"
              />
            </div>
            <div
              className="flex flex-col gap-y-2  mt-4
  md:mt-0"
            >
              <p className="hidden md:block font-semibold  text-sm">Playlist</p>
              <p
                className="text-white text-4xl
              sm:text-5xl lg:text-7xl font-bold"
              >
                Liked Songs
              </p>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
}
