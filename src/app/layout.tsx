import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import { ClerkProvider, Show, UserButton } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import "@clerk/ui/themes/shadcn.css";
import { AuthModal } from "@/components/auth-modal";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "FlashFlow – Akıllı Flashcard Uygulaması",
  description:
    "FlashFlow ile eğlenceli ve öğretici flashcard setleri oluşturarak öğrenmeyi oyunlaştır.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${geist.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            theme: shadcn,
          }}
        >
          <header className="fixed inset-x-0 top-0 z-30 bg-black-200 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-2 sm:px-4 lg:px-8">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <span className="text-lg font-semibold">FF</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  FlashFlow
                </span>
              </div>
              <div className="flex items-center gap-5">
               
                <AuthModal />
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </div>
            </div>
          </header>
          <main className="mt-10">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
