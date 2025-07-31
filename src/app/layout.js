import { Inter, Roboto_Mono } from "next/font/google";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LayoutCSS from "../layouts/Layout.module.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "React Project",
  description: "Next.js을 이용한 React 프로젝트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        <Header />
        <Navbar />
        <main className={LayoutCSS.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
