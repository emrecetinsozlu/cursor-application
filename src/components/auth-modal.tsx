"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Show } from "@clerk/nextjs";

type AuthMode = "sign-in" | "sign-up";

const clerkCardStyles = {
  rootBox: "w-full flex justify-center",
  card: "shadow-none border-0 w-full mx-auto",
};

export function AuthModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && open) {
      setOpen(false);
      router.push("/dashboard");
    }
  }, [isSignedIn, open, router]);

  // Modal açıkken Clerk içindeki "Sign up" / "Sign in" linkleri hash değiştirir; buna göre formu değiştir
  useEffect(() => {
    if (!open) return;
    const onHash = () => {
      if (typeof window !== "undefined") {
        setMode(window.location.hash === "#sign-up" ? "sign-up" : "sign-in");
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [open]);

  return (
    <>
      <Show when="signed-out">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            onClick={() => {
              setMode("sign-in");
              setOpen(true);
            }}
          >
            Sign in
          </Button>
          <Button
            onClick={() => {
              setMode("sign-up");
              setOpen(true);
            }}
          >
            Sign up
          </Button>
        </div>
      </Show>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-[min(400px,calc(100vw-2rem)] p-0 gap-0 overflow-hidden border-0 bg-transparent shadow-none flex items-center justify-center"
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">
            {mode === "sign-in" ? "Sign in" : "Sign up"}
          </DialogTitle>
          <div className="flex w-full items-center justify-center rounded-xl border bg-background p-0 shadow-lg ring-1 ring-foreground/10">
            {mode === "sign-in" ? (
              <SignIn
                routing="hash"
                signUpUrl="#sign-up"
                forceRedirectUrl="/dashboard"
                fallbackRedirectUrl="/dashboard"
                appearance={{ elements: clerkCardStyles }}
              />
            ) : (
              <SignUp
                routing="hash"
                signInUrl="#sign-in"
                forceRedirectUrl="/dashboard"
                fallbackRedirectUrl="/dashboard"
                appearance={{ elements: clerkCardStyles }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

