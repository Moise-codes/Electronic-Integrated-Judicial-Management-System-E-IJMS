import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "JusticeDesk | Integrated Judicial Management",
  description: "JusticeDesk is a modern, secure platform for managing judicial cases, hearings, documents and court workflows — all in one unified workspace.",
  icons: { icon: "/justicedesk-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
