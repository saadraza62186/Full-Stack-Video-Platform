import type React from "react"
import Providers from "./components/Providers"
import Header from "./components/Header"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Clipzy",
  description: "A platform to share and discover amazing short-form videos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
