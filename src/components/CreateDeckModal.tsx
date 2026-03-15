"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createDeck, type CreateDeckInput } from "@/app/dashboard/actions";
import { cn } from "@/lib/utils";

const labelClass =
  "text-sm font-medium text-foreground mb-1.5 block";
const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

export function CreateDeckModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateDeckInput, string[]>>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const payload: CreateDeckInput = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value.trim(),
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value.trim() || undefined,
    };

    setLoading(true);
    const result = await createDeck(payload);
    setLoading(false);

    if (result.ok) {
      setOpen(false);
      form.reset();
    } else {
      setErrors((result.error as Partial<Record<keyof CreateDeckInput, string[]>>) ?? {});
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="justify-start gap-3 rounded-lg px-3 py-2 text-sm font-medium w-full"
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
          Yeni deste oluştur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Yeni deste oluştur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="deck-title" className={labelClass}>
              Başlık
            </label>
            <input
              id="deck-title"
              name="title"
              type="text"
              placeholder="Örn: İngilizce Kelimeler"
              className={cn(inputClass, errors.title && "border-destructive focus:ring-destructive/20 focus:border-destructive")}
              required
              maxLength={255}
              autoComplete="off"
            />
            {errors.title?.[0] && (
              <p className="mt-1 text-xs text-destructive">{errors.title[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="deck-description" className={labelClass}>
              Açıklama <span className="text-muted-foreground font-normal">(isteğe bağlı)</span>
            </label>
            <textarea
              id="deck-description"
              name="description"
              placeholder="Destenin kısa açıklaması"
              rows={3}
              className={cn(inputClass, "resize-none", errors.description && "border-destructive focus:ring-destructive/20 focus:border-destructive")}
              maxLength={2000}
            />
            {errors.description?.[0] && (
              <p className="mt-1 text-xs text-destructive">{errors.description[0]}</p>
            )}
          </div>
          <DialogFooter showCloseButton={false}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              İptal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Oluşturuluyor…" : "Oluştur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
