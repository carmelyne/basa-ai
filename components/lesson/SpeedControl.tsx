"use client";

import { useState } from "react";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

type Rate = "slow" | "normal" | "fast";

const RATES: { value: Rate; label: string }[] = [
  { value: "slow",   label: "Mabagal" },
  { value: "normal", label: "Normal" },
  { value: "fast",   label: "Mabilis" },
];

interface SpeedControlProps {
  onChange?: (rate: Rate) => void;
  className?: string;
}

export function SpeedControl({ onChange, className }: SpeedControlProps) {
  const [rate, setRate] = useState<Rate>("normal");
  const [isOpen, setIsOpen] = useState(false);

  function select(r: Rate) {
    setRate(r);
    onChange?.(r);
    setIsOpen(false);
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Baguhin ang bilis ng pagbabasa"
        className="flex items-center gap-1 text-xs font-semibold text-forest-600 bg-forest-50 border border-forest-200 rounded-lg px-2 py-1.5 hover:bg-forest-100 transition-colors min-h-0"
      >
        <Gauge className="w-3.5 h-3.5" />
        {RATES.find((r) => r.value === rate)?.label}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-earth-200 rounded-xl shadow-lg overflow-hidden">
            {RATES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => select(value)}
                className={cn(
                  "flex w-full items-center px-4 py-3 text-sm font-medium transition-colors",
                  value === rate
                    ? "bg-forest-50 text-forest-700"
                    : "text-charcoal hover:bg-earth-50"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
