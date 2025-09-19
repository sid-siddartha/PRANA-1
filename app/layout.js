import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prana",
  description: "counsellor",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        </head>
        <body className={inter.className}>
          <Header />
          <Toaster position="top-right" richColors />
          {/* <ThemeProvider
              attribute="class"
              defaultTheme="Light"
              enableSystem
              disableTransitionOnChange
          ></ThemeProvider> */}
          {children}
          {/* <footer className="bg-muted/50 py-12">
            <div className="container mx-auto px-4 text-center text-gray">
              <p>Made by siddartha</p>
            </div>
          </footer> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
