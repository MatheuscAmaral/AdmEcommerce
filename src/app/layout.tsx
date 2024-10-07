import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

export const metadata: Metadata = {
  title: "Adm-Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="flex flex-col xl:flex-row gap-7 bg-gray-50"> 
        <div>
          <Header />
          <Sidebar />
        </div>

        {children}
      </body>
    </html>
  );
}
