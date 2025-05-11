"use client"

import type { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { ImageKitProvider } from "imagekitio-next"
import { NotificationProvider } from "./Notification"

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const authenticator = async () => {
    try {
      const res = await fetch("/api/imagekit-auth")
      if (!res.ok) throw new Error("Failed to authenticate")
      return res.json()
    } catch (error) {
      console.error("ImageKit authentication error:", error)
      throw error
    }
  }

  return (
    <SessionProvider refetchInterval={5 * 60}>
      <NotificationProvider>
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
          {children}
        </ImageKitProvider>
      </NotificationProvider>
    </SessionProvider>
  )
}
