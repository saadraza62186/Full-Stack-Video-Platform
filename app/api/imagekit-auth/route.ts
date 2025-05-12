export const dynamic = "force-dynamic"

import ImageKit from "imagekit"
import { NextResponse } from "next/server"

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
})

export async function GET() {
  try {
    // Set expiration time to 30 minutes from now (well within the 1 hour limit)
    const expireInSeconds = 30 * 60 // 30 minutes
    const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
    const expire = currentTime + expireInSeconds

    // Get authentication parameters with explicit expiration time
    const authenticationParameters = imagekit.getAuthenticationParameters("", expire)

    return NextResponse.json(authenticationParameters)
  } catch (error) {
    console.error("ImageKit auth error:", error)
    return NextResponse.json({ error: "Error generating authentication parameters" }, { status: 500 })
  }
}
