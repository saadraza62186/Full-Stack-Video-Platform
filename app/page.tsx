"use client"

import { useEffect, useState } from "react"
import VideoFeed from "./components/VideoFeed"
import type { IVideo } from "@/models/Video"
import { apiClient } from "@/lib/api-client"
import { Loader2 } from "lucide-react"

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getVideos()
        setVideos(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching videos:", error)
        setError("Failed to load videos. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Clipzy</h1>
        <p className="text-base-content/70 mt-2 text-center max-w-2xl">Share and discover amazing short-form videos</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="alert alert-error max-w-md mx-auto">
          <p>{error}</p>
        </div>
      ) : (
        <VideoFeed videos={videos} />
      )}
    </main>
  )
}
