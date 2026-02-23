import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xorox-rising.vercel.app"),
  title: "L'Artefact de la Vérité | XoroX Rising - Court-Métrage Sci-Fi",
  description: "Découvrez XoroX Rising : un thriller sci-fi captivant mêlant archéologie interdite, conspirations mondiales et technologie alien. Suivez 8 héros dans leur quête pour révéler la vérité. Portfolio du film, personnages, making-of et bande-annonce exclusive.",
  keywords: ["XoroX Rising", "L'Artefact de la Vérité", "court-métrage science-fiction", "film sci-fi français", "thriller archéologique", "cinéma indépendant", "animation 3D", "portfolio film", "making-of", "bande-annonce", "conspirations", "technologie alien", "film d'aventure"],
  openGraph: {
    title: "L'Artefact de la Vérité | XoroX Rising",
    description: "Un thriller sci-fi captivant mêlant archéologie interdite et technologie alien. Découvrez l'univers du film.",
    url: "https://xorox-rising.vercel.app",
    siteName: "XoroX Rising Portfolio",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "XoroX Rising OGM",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Artefact de la Vérité | XoroX Rising",
    description: "Un court-métrage haletant entre archéologie interdite et technologie du futur.",
    images: ["/assets/og-image.jpg"],
  },
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#25d1f4" />
      </head>
      <body className={`${outfit.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
