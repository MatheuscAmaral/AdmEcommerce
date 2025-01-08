import { Metadata } from "next";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import ReloadProvider from "@/hooks/reloadContent";
import "./globals.css";

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
      
        <ReloadProvider>
          <body className="grid grid-cols-1 xl:grid-cols-[250px_1fr] gap-7 bg-gray-50">
            <div>
              <Header />
              <Sidebar />
            </div>

            <div className="xl:overflow-x-auto max-w-full">
              {children}
            </div>
          </body>
        </ReloadProvider>
    </html>
  );
}
