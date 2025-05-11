import { IKVideo } from "imagekitio-next"
import Link from "next/link"
import type { IVideo } from "@/models/Video"
import { Play } from "lucide-react"

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <Link href={`/videos/${video._id}`} className="block">
      <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 h-full">
        <figure className="relative px-4 pt-4">
          <div className="relative group w-full block">
            <div className="rounded-xl overflow-hidden relative w-full" style={{ aspectRatio: "9/16" }}>
              <IKVideo
                path={video.videoUrl}
                transformation={[
                  {
                    height: "1920",
                    width: "1080",
                  },
                ]}
                controls={false}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-primary/80 rounded-full p-3">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </figure>

        <div className="card-body p-4">
          <h2 className="card-title text-lg line-clamp-1">{video.title}</h2>
          <p className="text-sm text-base-content/70 line-clamp-2 mt-1">{video.description}</p>
        </div>
      </div>
    </Link>
  )
}
