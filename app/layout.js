import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deepseek",
  description: "Full Stack Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* ✅ Providers should wrap content inside <body> */}
        <ClerkProvider>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
