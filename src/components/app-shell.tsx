"use client";
import { Bell, BookOpen, ClipboardList, FileText, Gavel, LayoutDashboard, LogOut, Menu, Scale, UserCircle, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers";
import { Logo } from "@/components/ui";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Cases", icon: Gavel },
  { href: "/hearings", label: "Hearings", icon: ClipboardList },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/participants", label: "Participants", icon: Users },
  { href: "/judgments", label: "Judgments", icon: Scale },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const logout = () => {
    signOut();
    router.push("/login");
  };

  const sidebar = (
    <aside className="flex h-full w-72 flex-col bg-black px-4 py-6">
      <Logo light />
      <nav className="mt-10 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              path.startsWith(href)
                ? "border-l-2 border-white bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
            href={href}
            key={href}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
        {user?.role === "admin" && (
          <Link
            className={`mt-5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
              path.startsWith("/admin") ? "bg-white/10 text-white" : "text-gray-400"
            }`}
            href="/admin/audit-logs"
          >
            <BookOpen className="h-4 w-4" />
            Audit logs
          </Link>
        )}
      </nav>
      <div className="mt-auto border-t border-white/10 pt-4">
        <Link href="/profile" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5">
          <UserCircle className="h-4 w-4" />
          Profile
        </Link>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5">
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="hidden fixed inset-y-0 left-0 lg:block">{sidebar}</div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
          <div className="relative h-full">
            {sidebar}
            <button aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute right-4 top-6 text-white">
              <X />
            </button>
          </div>
        </div>
      )}
      <main className="lg:pl-72">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">
          <button aria-label="Open navigation" onClick={() => setOpen(true)} className="rounded-md p-2 text-black lg:hidden">
            <Menu />
          </button>
          <div className="hidden lg:block text-sm text-gray-500">
            Secure workspace <span className="text-black">•</span> JusticeDesk
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Bell className="h-5 w-5 text-gray-500" aria-label="Notifications" />
            <div className="text-right text-sm">
              <div className="font-semibold text-black">{user?.firstname} {user?.lastname}</div>
              <div className="text-xs capitalize text-gray-500">{user?.role}</div>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl p-5 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
