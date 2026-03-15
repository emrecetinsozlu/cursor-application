"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TestUiPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto max-w-2xl space-y-8 py-12">
      <h1 className="text-2xl font-bold">shadcn/ui Test</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Button</h2>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Dialog</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Dialog Aç</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Başlık</DialogTitle>
              <DialogDescription>
                shadcn/ui Dialog bileşeni çalışıyorsa bu metin görünür.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
