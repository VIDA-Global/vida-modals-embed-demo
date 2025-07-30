import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

// The Vida modal script is loaded globally here so that any page can use the
// vidaModal object to open modals.

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script src="https://vida.io/embed/modal/v1/script.js" strategy="afterInteractive" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
