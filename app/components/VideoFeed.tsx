import type { IVideo } from "@/models/Video"
import VideoComponent from "./VideoComponent"

interface VideoFeedProps {
  videos: IVideo[]
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}

      {videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="max-w-md mx-auto p-8 border border-base-300 rounded-lg bg-base-200/50">
            <p className="text-base-content/70 text-lg">No videos found</p>
            <p className="text-sm mt-2">Be the first to upload a video!</p>
          </div>
        </div>
      )}
    </div>
  )
}
