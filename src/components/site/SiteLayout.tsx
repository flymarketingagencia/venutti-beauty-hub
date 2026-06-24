import type { ReactNode } from "react";
import { Topbar } from "./Topbar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsappFloat } from "./WhatsappFloat";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Topbar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsappFloat />
    </div>
  );
}
