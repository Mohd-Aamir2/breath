import { Wind } from 'lucide-react';

export function Header() {
  return (
    <header className="p-4 border-b bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center gap-3">
        <Wind className="size-7 text-primary" />
        <h1 className="text-2xl font-bold font-headline text-foreground">
          BreatheEasy
        </h1>
      </div>
    </header>
  );
}
