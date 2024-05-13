import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * Represents the metadata for the Kura platform.
 */
export const metadata: Metadata = {
  title: "Kura",
  description: "Kura is a platform that connects individuals and institutions by providing access to statistical polling data. Individuals can express their opinions, stay informed, and engage with institutions transparently. Institutions benefit from access to public opinion data for informed decision-making, transparent engagement, and service tailoring. With features such as creating and participating in polls, managing profiles, and ensuring privacy, Kura empowers both users and institutions to have a voice, make informed decisions, and foster transparent communication.",
  icons: "/icon.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className.toString()}`}>
          {children}
      </body>
    </html>
  );
}
