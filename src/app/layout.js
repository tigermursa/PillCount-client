import localFont from "next/font/local";
import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionWrapper from "@/components/Auth/SessionWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Pill Count",
  description: "Track the pill of everyday life easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          {/* Toast notifications */}
          <ToastContainer
            position="top-center"
            autoClose={2500}
            transition={Slide}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {/* The children will be your app's content */}
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
