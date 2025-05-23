import { Outfit } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "./globals.css";
import AOSInitializer from "@/components/aos-initializer/AOSInitializer";
import { AuthProvider } from "./context/Authcontext";

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
      <body className={`${fontOutfit.className}`}>
        <AOSInitializer />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
