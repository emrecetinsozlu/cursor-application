"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addCard, updateCardAction, deleteCardAction } from "./actions";
import type { AddCardInput, UpdateCardInput } from "./actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const labelClass = "text-sm font-medium text-foreground mb-1.5 block";
const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

type CardItem = {
  id: number;
  deckId: number;
  front: string;
  back: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

function formatDate(d: Date | null) {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DeckDetailClient({
  deckId,
  deckTitle,
  deckDescription,
  cards,
}: {
  deckId: number;
  deckTitle: string;
  deckDescription: string | null;
  cards: CardItem[];
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardItem | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [addErrors, setAddErrors] = useState<Partial<Record<keyof AddCardInput, string[]>>>({});
  const [editErrors, setEditErrors] = useState<Partial<Record<keyof UpdateCardInput, string[]>>>({});
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null);
  const [deleteConfirmCardId, setDeleteConfirmCardId] = useState<number | null>(null);

  async function handleAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddErrors({});
    const form = e.currentTarget;
    const payload: AddCardInput = {
      deckId,
      front: (form.elements.namedItem("front") as HTMLInputElement).value.trim(),
      back: (form.elements.namedItem("back") as HTMLTextAreaElement).value.trim(),
    };
    setAddLoading(true);
    const result = await addCard(payload);
    setAddLoading(false);
    if (result.ok) {
      setAddOpen(false);
      form.reset();
      toast.success("Kart eklendi.");
    } else {
      const err = result.error as Partial<Record<keyof AddCardInput | "_form", string[]>> | undefined;
      setAddErrors(err ?? {});
      const msg = err?._form?.[0] ?? err?.front?.[0] ?? err?.back?.[0] ?? "Kart eklenemedi.";
      toast.error(msg);
    }
  }

  function openEdit(card: CardItem) {
    setEditingCard(card);
    setEditErrors({});
    setEditOpen(true);
  }

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingCard) return;
    setEditErrors({});
    const form = e.currentTarget;
    const payload: UpdateCardInput = {
      cardId: editingCard.id,
      deckId,
      front: (form.elements.namedItem("edit-front") as HTMLInputElement).value.trim(),
      back: (form.elements.namedItem("edit-back") as HTMLTextAreaElement).value.trim(),
    };
    setEditLoading(true);
    const result = await updateCardAction(payload);
    setEditLoading(false);
    if (result.ok) {
      setEditOpen(false);
      setEditingCard(null);
      toast.success("Kart güncellendi.");
    } else {
      const err = result.error as Partial<Record<keyof UpdateCardInput | "_form", string[]>> | undefined;
      setEditErrors(err ?? {});
      const msg = err?._form?.[0] ?? err?.front?.[0] ?? err?.back?.[0] ?? "Kart güncellenemedi.";
      toast.error(msg);
    }
  }

  async function handleDelete(cardId: number) {
    setDeleteLoadingId(cardId);
    setDeleteConfirmCardId(null);
    const result = await deleteCardAction({ cardId, deckId });
    setDeleteLoadingId(null);
    if (result.ok) {
      toast.success("Kart silindi.");
    } else {
      const msg = (result.error as { _form?: string[] })?._form?.[0] ?? "Kart silinemedi.";
      toast.error(msg);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header: title + Add card */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {deckTitle}
          </h1>
          {deckDescription && (
            <p className="text-sm text-muted-foreground">{deckDescription}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button size="lg" className="gap-2" variant="secondary" asChild>
            <Link href={`/decks/${deckId}/study`}>
              <BookOpen className="h-4 w-4" />
              Çalış
            </Link>
          </Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="h-4 w-4" />
                Kart ekle
              </Button>
            </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Yeni kart ekle</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="grid gap-4">
            <div>
              <label htmlFor="card-front" className={labelClass}>
                Ön yüz (soru)
              </label>
              <Input
                id="card-front"
                name="front"
                placeholder="Soru veya kelime"
                className={cn(addErrors.front && "border-destructive")}
                required
                maxLength={5000}
                autoComplete="off"
              />
              {addErrors.front?.[0] && (
                <p className="mt-1 text-xs text-destructive">{addErrors.front[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="card-back" className={labelClass}>
                Arka yüz (cevap)
              </label>
              <Textarea
                id="card-back"
                name="back"
                placeholder="Cevap veya açıklama"
                rows={3}
                className={cn("resize-none", addErrors.back && "border-destructive")}
                required
                maxLength={5000}
              />
              {addErrors.back?.[0] && (
                <p className="mt-1 text-xs text-destructive">{addErrors.back[0]}</p>
              )}
            </div>
            <DialogFooter showCloseButton={false}>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddOpen(false)}
                disabled={addLoading}
              >
                İptal
              </Button>
              <Button type="submit" disabled={addLoading}>
                {addLoading ? "Ekleniyor…" : "Ekle"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Edit card dialog */}
      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          if (!open) setEditingCard(null);
          setEditOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kartı düzenle</DialogTitle>
          </DialogHeader>
          {editingCard && (
            <form onSubmit={handleEditSubmit} className="grid gap-4">
              <div>
                <label htmlFor="edit-front" className={labelClass}>
                  Ön yüz (soru)
                </label>
                <Input
                  id="edit-front"
                  name="edit-front"
                  defaultValue={editingCard.front}
                  placeholder="Soru veya kelime"
                  className={cn(editErrors.front && "border-destructive")}
                  required
                  maxLength={5000}
                  autoComplete="off"
                />
                {editErrors.front?.[0] && (
                  <p className="mt-1 text-xs text-destructive">{editErrors.front[0]}</p>
                )}
              </div>
              <div>
                <label htmlFor="edit-back" className={labelClass}>
                  Arka yüz (cevap)
                </label>
                <Textarea
                  id="edit-back"
                  name="edit-back"
                  defaultValue={editingCard.back}
                  placeholder="Cevap veya açıklama"
                  rows={3}
                  className={cn("resize-none", editErrors.back && "border-destructive")}
                  required
                  maxLength={5000}
                />
                {editErrors.back?.[0] && (
                  <p className="mt-1 text-xs text-destructive">{editErrors.back[0]}</p>
                )}
              </div>
              <DialogFooter showCloseButton={false}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditOpen(false)}
                  disabled={editLoading}
                >
                  İptal
                </Button>
                <Button type="submit" disabled={editLoading}>
                  {editLoading ? "Kaydediliyor…" : "Kaydet"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={deleteConfirmCardId !== null}
        onOpenChange={(open) => !open && setDeleteConfirmCardId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kartı sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu kartı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoadingId !== null}>
              İptal
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleteLoadingId !== null}
              onClick={() => deleteConfirmCardId !== null && handleDelete(deleteConfirmCardId)}
            >
              {deleteLoadingId !== null ? "Siliniyor…" : "Sil"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Card list */}
      {cards.length === 0 ? (
        <Card className="overflow-hidden rounded-2xl border-border/40 bg-background/60 shadow-sm backdrop-blur">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-sm font-medium text-foreground">Henüz kart yok</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Bu desteye ilk kartını eklemek için &quot;Kart ekle&quot; butonunu kullan.
            </p>
            <Button size="lg" className="mt-6 gap-2" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" />
              Kart ekle
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {cards.map((card) => (
            <li key={card.id}>
              <Card className="overflow-hidden rounded-2xl border-border/40 bg-background/60 shadow-sm backdrop-blur">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">{card.front}</p>
                      <p className="text-sm text-muted-foreground">{card.back}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>Oluşturulma: {formatDate(card.createdAt)}</span>
                        <span>Son güncelleme: {formatDate(card.updatedAt)}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEdit(card)}
                        aria-label="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteConfirmCardId(card.id)}
                        disabled={deleteLoadingId === card.id}
                        aria-label="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
