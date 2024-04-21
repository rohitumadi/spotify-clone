"use client";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  //this is to prevent hydration error
  //in server side rendering modals can cause hydration error
  //so we never want to render a modal in server side rendering
  //so none of the modals can be opened in server side
  useEffect(() => setIsMounted(true), []);

  //so if in server side rendering we return null
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
}
