import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "~/StarknetProvider";
import { Toaster } from "react-hot-toast";

import LinkToDevTools from "./components/ui_components/LinkToDevTools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starknet Eventoors",
  description: "Project initialized using Starknet Scaffold", //! To be replaced by a description of the dApp!
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} dark:bg-black bg-gray-300 dark:text-white transition-all duration-500 ease-in-out`}
      >
        <StarknetProvider>{children}</StarknetProvider>
        <Toaster />

        {/* BELOW LINK TO DEV TOOLS TO BE REMOVED FOR PRODUCTION */}
        <LinkToDevTools />
      </body>
    </html>
  );
}
