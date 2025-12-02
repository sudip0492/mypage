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
  description: "A portfolio of my work as a Full Stack Developer, Graphic Designer, and GenAI Engineer.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${scienceGothic.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <StarfieldCanvas />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}