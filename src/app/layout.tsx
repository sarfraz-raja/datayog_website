import type { Metadata } from "next";
import { Inter, Quantico } from "next/font/google";
import { ConsultProvider } from "@/components/forms/consult-dialog";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Brand font for the "DATAYOG" wordmark in the logo only.
const quantico = Quantico({ subsets: ["latin"], weight: "700", variable: "--font-quantico", display: "swap" });

export const metadata: Metadata = {
  title: { default: "DATAYOG — Your Network Solutionist", template: "%s | DATAYOG" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${quantico.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans" suppressHydrationWarning>
        <ConsultProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ConsultProvider>
      </body>
    </html>
  );
}
