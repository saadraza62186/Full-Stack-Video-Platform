import { dbConnect } from "@/lib/db"
import Video from "@/models/Video"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const video = await Video.findById(params.id).lean()

    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 })
    }

    return NextResponse.json(video, { status: 200 })
  } catch (error) {
    console.error("Error fetching video:", error)
    return NextResponse.json({ message: "Failed to fetch video" }, { status: 500 })
  }
}
