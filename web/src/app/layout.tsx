import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attivati!",
  description: "La bacheca del volontariato del Trentino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
