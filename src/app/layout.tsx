import type { Metadata } from "next";
import "./globals.css";

import { Exo_2 } from "next/font/google";
import Script from "next/script";
import { Authenticate } from "@/api/auth";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@/constant";
import AuthProvider from "@/global-states/zustand/AuthProvider";

const exo = Exo_2({ weight: "400", subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "edge of eSports",
  description: "battleroyale esports",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const response = await Authenticate(cookieStore.get(ACCESS_TOKEN)?.value);

  return (
    <html lang="en">
      <link rel="icon" href="/eoe.jpg" />
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body className={exo.className}>
        <AuthProvider res={response}>{children}</AuthProvider>
        <div id="globalToast">
          <div id="toastText">Say me Anything!</div>
        </div>
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    </html>
  );
}
