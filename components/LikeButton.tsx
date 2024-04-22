"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}
export default function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchLikedSongs = async () => {
      const { data: likedSongs, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();
      if (!error && likedSongs) {
        setIsLiked(true);
      }
    };
    fetchLikedSongs();
  }, [songId, user?.id, supabaseClient]);
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  async function handleLike() {
    if (!user) {
      return authModal.onOpen();
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error("Failed to unlike");
        console.log(error.message);
      } else {
        setIsLiked(false);
        toast.success("Unliked");
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ song_id: songId, user_id: user.id });

      if (error) {
        toast.error("Failed to like");
        console.log(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked");
      }
    }
    router.refresh();
  }
  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
}
