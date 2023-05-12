import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import { CustomNavbar } from "../components/CustomNavbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PokeStats",
  description: "A website dedicated to Pokemon lover 💞",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomNavbar />

        {children}
      </body>
    </html>
  );
}
