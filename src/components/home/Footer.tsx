export function Footer() {
  return (
    <footer className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-8 pt-2 text-[0.7rem] text-muted-foreground">
      <p>© {new Date().getFullYear()} FlashFlow. Tüm hakları saklıdır.</p>
      <div className="flex gap-4">
        <span>Kullanım Koşulları</span>
        <span>Gizlilik</span>
      </div>
    </footer>
  );
}
