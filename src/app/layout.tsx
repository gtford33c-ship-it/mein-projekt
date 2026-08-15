import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "TRINI Jugendtreff",
  description:
    "Jugendtreff TRINI - gemeinsam erleben, gestalten und wachsen.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >

      <body className="bg-black text-white antialiased">

        {children}

      </body>

    </html>

  );

}