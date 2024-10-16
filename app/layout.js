import { Inter } from "next/font/google";
import "./globals.css";
import "./global.scss";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crushing Digital",
  description: "Rank yourself",
};

export default function RootLayout({ children, className = "" }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
        {/* </main> */}
      </html>
    </ClerkProvider>
  );
}
