import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-forest-100 flex items-center justify-center">
        <BookOpen className="w-10 h-10 text-forest-400" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-forest-800 mb-2">
          Hindi nahanap ang pahina
        </h1>
        <p className="text-charcoal/60">
          Page not found. Let&apos;s go back.
        </p>
      </div>
      <Link
        href="/learn"
        className="bg-forest-700 hover:bg-forest-800 text-cream font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Bumalik sa Mga Aralin
      </Link>
    </main>
  );
}
