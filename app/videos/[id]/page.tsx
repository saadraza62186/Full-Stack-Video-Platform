"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { IKVideo } from "imagekitio-next"
import { Loader2, ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import type { IVideo } from "@/models/Video"
import { apiClient } from "@/lib/api-client"

export default function VideoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [video, setVideo] = useState<IVideo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideo = async () => {
      if (!params.id) return

      try {
        setLoading(true)
        const data = await apiClient.getVideo(params.id as string)
        setVideo(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching video:", error)
        setError("Failed to load video. It may have been removed or is unavailable.")
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !video) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="btn btn-ghost mb-6 gap-2">
            <ArrowLeft size={18} />
            Back to videos
          </Link>

          <div className="alert alert-error">
            <p>{error || "Video not found"}</p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="btn btn-primary">
              Browse other videos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="btn btn-ghost mb-6 gap-2">
          <ArrowLeft size={18} />
          Back to videos
        </Link>

        <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
          <div className="aspect-[9/16] w-full max-w-md mx-auto relative">
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: video.transformation?.height || 1920,
                  width: video.transformation?.width || 1080,
                },
              ]}
              controls={true}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>

            <div className="flex flex-wrap gap-3 text-sm text-base-content/70 mb-4">
              {video.createdAt && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>Video</span>
              </div>
            </div>

            <div className="divider my-4"></div>

            <h2 className="font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
