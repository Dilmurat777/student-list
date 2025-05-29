import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Student Management App",
  description: "Список студентов с админ-панелью и CRUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
