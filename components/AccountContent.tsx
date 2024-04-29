"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountContent() {
  const { isLoading, user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  return (
    <div className="px-6">
      <p>Email: {user?.email}</p>
    </div>
  );
}
