import { Outfit } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "./globals.css";
import AOSInitializer from "@/components/aos-initializer/AOSInitializer";
import { AuthProvider } from "./context/Authcontext";
import SessionWrapper from "@/components/SessionWrapper";
import { Suspense } from 'react';
const fontOutfit = Outfit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ScaleLeads",
  description: "Générez des leads qualifiés pendant que vous dormez.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
     <SessionWrapper>
      <body className={`${fontOutfit.className}`}>
        <AOSInitializer />
        <AuthProvider><Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense></AuthProvider>
      </body>
</SessionWrapper>
    </html>
  );
}
