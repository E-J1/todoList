import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import Container from "../components/ui/Container";

const nanum = localFont({
  src: [
    {
      path: "../public/fonts/NanumSquareR.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NanumSquareB.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "Todo List App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={nanum.variable}>
      <body className="text-slate-900 min-h-screen">
        <header className="bg-white border-b border-b-slate-200 ">
          <Container className="flex items-center  desktop:max-w-[1200px]  h-[60px] tablet:max-w-tablet">
            <a href="/">
              <picture>
                {/* 모바일(≤375px)에서는 logo_s */}
                <source
                  srcSet="/logo/logo_s.svg"
                  media="(max-width: 375px)"
                  width={71}
                  height={40}
                />
                {/* 그 외에는 logo_l */}
                <img
                  src="/logo/logo_l.svg"
                  alt="do it; 로고"
                  className="object-contain"
                  width={151}
                  height={40}
                />
              </picture>
            </a>
          </Container>
        </header>
        <main className="bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
