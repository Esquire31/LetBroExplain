import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import SiteNavbar from "@/shared/nav/topNav"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "LetBroExplain",
  description: "Coding explained like you’re five (but smarter).",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <SiteNavbar />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
