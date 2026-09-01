import { AlertCircle, CheckCircle2, Clock3, Info, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="JusticeDesk home">
      <Image
        src="/justicedesk-logo.png"
        alt="JusticeDesk"
        width={36}
        height={36}
        className="rounded-full"
      />
      <span
        className={`font-semibold text-lg tracking-wide ${light ? "text-white" : "text-black"}`}
        style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", letterSpacing: "0.05em" }}
      >
        JusticeDesk
      </span>
    </Link>
  );
}

export function Button({ className = "", variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-black/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
        variant === "primary"
          ? "bg-black text-white hover:bg-black/90 shadow-lg hover:shadow-xl"
          : variant === "secondary"
          ? "border border-black bg-white text-black hover:bg-gray-50"
          : "text-black hover:bg-gray-100"
      } ${className}`}
      {...props}
    />
  );
}

export function Input({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const id = props.id || props.name;
  return (
    <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
      {label}
      <input
        id={id}
        className={`mt-1.5 block w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/15 ${
          error ? "border-red-700" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-700" role="alert">{error}</span>}
    </label>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const icon = ["active", "closed"].includes(normalized) ? <CheckCircle2 /> : normalized === "pending" ? <Clock3 /> : normalized === "urgent" ? <AlertCircle /> : <Info />;
  const theme = ["active", "closed", "low"].includes(normalized)
    ? "bg-green-50 text-green-800"
    : ["urgent"].includes(normalized)
    ? "bg-red-50 text-red-800"
    : ["pending", "medium", "hearing", "judgment"].includes(normalized)
    ? "bg-amber-50 text-amber-800"
    : "bg-blue-50 text-blue-800";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${theme}`}>
      {icon && <span className="h-3.5 w-3.5">{icon}</span>}{status}
    </span>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
      <ShieldCheck className="mx-auto h-8 w-8 text-black" />
      <h3 className="mt-3 text-lg font-bold text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-gray-600">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}
