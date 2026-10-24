import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Schibsted_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/v3/SmoothScroll";
import "./globals.css";

const sans = Schibsted_Grotesk({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });
const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500"], style: ["italic"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://anneboulletv3.vercel.app"),
  title: { default: "Anne Boullet Studio · Décoratrice d'intérieur à La Rochelle", template: "%s · Anne Boullet Studio" },
  description:
    "Conseil, conception et décoration pour les particuliers et les professionnels, à une heure autour de La Rochelle, sur l'Île de Ré et Oléron.",
  robots: { index: false, follow: false },
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip" href="#contenu">Aller au contenu</a>
        <div className="page">
          <div className="wrap v2 v3">
            <Header />
            <main id="contenu">{children}</main>
            <Footer />
          </div>
        </div>
        <SmoothScroll />
      </body>
    </html>
  );
}
