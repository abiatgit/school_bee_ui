import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 



export const metadata: Metadata = {
  title: "SchoolBee Dashboard",
  description: "Next.js School Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>{children }<ToastContainer/></body>
      </ClerkProvider>
    </html>
  );
}
