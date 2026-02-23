import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SoundToggle from "@/components/SoundToggle";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "L'Artefact de la Vérité | XoroX Rising",
  description: "Un court-métrage haletant inspiré des grandes épopées d'aventure. Entre archéologie interdite et technologie du futur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preload" as="video" href="/assets/hero_videos/creature3_optimized.webm" type="video/webm" />
      </head>
      <body className={`${outfit.variable} antialiased bg-background text-foreground`}>
        {children}
        <SoundToggle />
        <SpeedInsights />
      </body>
    </html>
  );
}
