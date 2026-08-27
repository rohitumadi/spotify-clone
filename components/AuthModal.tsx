"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

type AuthMode = "login" | "signup";

const getRedirectUrl = () => `${window.location.origin}/auth/callback`;

export default function AuthModal() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  const handleEmailAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const { data, error } =
      mode === "signup"
        ? await supabaseClient.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: getRedirectUrl() },
          })
        : await supabaseClient.auth.signInWithPassword({ email, password });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (mode === "signup" && !data.session) {
      toast.success("Confirmation email sent. Check your inbox to finish signing up.");
    } else {
      toast.success(mode === "signup" ? "Account created" : "Logged in");
    }
  };

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: getRedirectUrl() },
    });

    if (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    const { error } = await supabaseClient.auth.signInAnonymously({
      options: { data: { display_name: "Guest" } },
    });
    setIsLoading(false);

    if (error) {
      const message =
        error.code === "anonymous_provider_disabled"
          ? "Guest login is not enabled yet. Enable Anonymous Sign-Ins in Supabase Auth settings."
          : error.message;
      toast.error(message);
    }
  };

  return (
    <Modal
      title={mode === "login" ? "Welcome back" : "Create your account"}
      description={
        mode === "login" ? "Login to your account" : "Sign up to save your music"
      }
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col gap-y-4">
        <Button
          onClick={handleGitHubLogin}
          disabled={isLoading}
          className="w-full bg-white px-6 py-2"
        >
          Continue with GitHub
        </Button>

        <Button
          onClick={handleGuestLogin}
          disabled={isLoading}
          className="w-full bg-neutral-700 px-6 py-2 text-white"
        >
          Continue as guest
        </Button>

        <div className="flex items-center gap-x-3 text-xs text-neutral-500">
          <div className="h-px flex-1 bg-neutral-700" />
          <span>OR</span>
          <div className="h-px flex-1 bg-neutral-700" />
        </div>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-y-3">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            disabled={isLoading}
            required
          />
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            disabled={isLoading}
            minLength={6}
            required
          />
          <Button disabled={isLoading} type="submit" className="w-full bg-emerald-500 px-6 py-2">
            {mode === "login" ? "Login with email" : "Sign up with email"}
          </Button>
        </form>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-sm text-neutral-400 hover:text-white disabled:opacity-50"
        >
          {mode === "login"
            ? "New here? Create an account"
            : "Already have an account? Log in"}
        </button>
      </div>
    </Modal>
  );
}
