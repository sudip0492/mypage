import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { StarfieldCanvas } from "@/components/starfield-effect";

const scienceGothic = localFont({
  src: "../../public/fonts/ScienceGothic.ttf",
  variable: "--font-science-gothic",
});

export const metadata: Metadata = {
  title: "Sudipta Maity",
  description: "Portfolio of Sudipta Maity - Software Developer, Web Developer, and Mobile Developer specializing in full-stack applications.",
  icons: {
    icon: "/dp.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-hidden">
      <body className={`${scienceGothic.variable} font-sans overflow-hidden h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <StarfieldCanvas />
          <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <main className="flex-grow pt-20 overflow-hidden">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}