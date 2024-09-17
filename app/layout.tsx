import type { Metadata } from "next";

import "./globals.css";
import Navigation from "./components/Navigation";
import { CalendarProvider } from "./context/CalendarContext";
import { Toaster } from "react-hot-toast";
import { auth } from "./_lib/auth";

export const metadata: Metadata = {
  title: "Scheduler",
  description: "A simple scheduling app",
};

import { Inknut_Antiqua } from "next/font/google";

// const defaultFont = Inknut_Antiqua({
//   weight: "300",
//   subsets: ["latin"],
//   variable: "--my-font",
// });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-main-100 antialiased min-h-screen text-secondary-800 flex flex-col relative`}
      >
        <Navigation />

        <main className="max-w-10xl mx-5">
          <Toaster position="top-center" />
          <CalendarProvider>{children}</CalendarProvider>
        </main>
      </body>
    </html>
  );
}
