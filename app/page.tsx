import Link from "next/link";
import { BookOpen, Mic, MessageCircle, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        {/* Logo mark */}
        <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-forest-700 shadow-lg">
          <BookOpen className="w-10 h-10 text-earth-200" strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-forest-800 mb-3 tracking-tight">
          Basa
        </h1>
        <p className="text-xl text-forest-600 mb-2 font-medium">
          Matuto Magbasa
        </p>
        <p className="text-base text-charcoal/60 mb-10 max-w-xs leading-relaxed">
          Libre. Madali. Para sa lahat ng Pilipino.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Link
            href="/learn"
            className="flex items-center justify-center gap-2 bg-forest-700 hover:bg-forest-800 active:bg-forest-900 text-cream font-semibold text-lg rounded-xl px-6 py-4 transition-colors shadow-md"
          >
            Magsimula Na
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/learn"
            className="flex items-center justify-center gap-2 border-2 border-forest-300 hover:border-forest-500 text-forest-700 font-medium text-lg rounded-xl px-6 py-4 transition-colors"
          >
            Tingnan ang mga Aralin
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-forest-600 mb-6 text-center">
            Ano ang matututunan mo?
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <FeatureCard
              icon={<BookOpen className="w-6 h-6 text-forest-600" />}
              title="Mga Titik at Salita"
              desc="Mula sa alpabeto hanggang sa mga pangungusap."
            />
            <FeatureCard
              icon={<Mic className="w-6 h-6 text-forest-600" />}
              title="Pakinggan ang Pagbabasa"
              desc="I-tap ang salita para marinig kung paano ito basahin."
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6 text-forest-600" />}
              title="AI na Guro"
              desc="Tanungin ang iyong personal na guro anumang oras."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6 text-forest-600" />}
              title="Subaybayan ang Pag-unlad"
              desc="Makita ang iyong napag-aralan at patuloy na lumago."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-charcoal/40">
        <p>Basa &copy; 2025 — Libre para sa lahat</p>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-earth-100">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-forest-50">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-forest-800 text-base">{title}</h3>
        <p className="text-charcoal/60 text-sm leading-relaxed mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
