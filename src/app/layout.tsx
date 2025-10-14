import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A simple blog built with Next.js, Tailwind CSS, and shadcn/ui.",
  icons: {
    icon: "https://tse1.mm.bing.net/th/id/OIP.zaXQxfPeNSqE7VnEj2fIEwHaFj?cb=12&pid=ImgDet&w=184&h=138&c=7&dpr=1.3&o=7&rm=3",       // default favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
