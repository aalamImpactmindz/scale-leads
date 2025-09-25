import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "react-toastify";


export default function SiteLayout({ children }) {
  return (
    <>
     <ToastContainer toastStyle={{ width: '430px' }} />
      <Header />
      {children}
      <Footer />
    </>
  );
}
